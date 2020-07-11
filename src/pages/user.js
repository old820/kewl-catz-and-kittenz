import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { getSingleUserData } from '../redux/actions/dataActions';
import StaticProfile from '../components/profile/StaticProfile';
import Reaction from '../components/reaction/Reaction';
import ReactionSkeleton from '../util/ReactionSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

import Grid from '@material-ui/core/Grid';

class User extends Component {
  state = {
    profile: null,
    reactionIdParam: null,
  };

  componentDidMount() {
    const handle = this.props.match.params.handle;
    const reactionId = this.props.match.params.reactionId;

    if (reactionId) this.setState({ reactionIdParam: reactionId });
    this.props.getSingleUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({ profile: res.data.user });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { reactions, loading } = this.props.data;
    const { reactionIdParam } = this.state;

    const reactionsMarkup = loading ? (
      <ReactionSkeleton />
    ) : reactions === null ? (
      <p>No reactions from this user :/</p>
    ) : !reactionIdParam ? (
      reactions.map((reaction) => (
        <Reaction key={reaction.reactionId} reaction={reaction} />
      ))
    ) : (
      reactions.map((reaction) => {
        if (reaction.reactionId !== reactionIdParam) {
          return <Reaction key={reaction.reactionId} reaction={reaction} />;
        }
        return (
          <Reaction key={reaction.reactionId} reaction={reaction} openDialog />
        );
      })
    );

    return (
      <Grid container spacing={8}>
        <Grid item sm={8} xs={12}>
          {reactionsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

User.propTypes = {
  getSingleUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapState = (state) => ({
  data: state.data,
});

const mapActions = {
  getSingleUserData,
};

export default connect(mapState, mapActions)(User);
