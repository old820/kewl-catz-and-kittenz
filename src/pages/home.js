import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getReactions } from '../redux/actions/dataActions';
import Grid from '@material-ui/core/Grid';
import Reaction from '../components/reaction/Reaction';
import Profile from '../components/profile/Profile';
import ReactionSkeleton from '../util/ReactionSkeleton';

class Home extends Component {
  componentDidMount() {
    this.props.getReactions();
  }

  render() {
    const { reactions, loading } = this.props.data;
    let recentReactionsMarkup = !loading ? (
      reactions.map((reaction) => (
        <Reaction key={reaction.reactionId} reaction={reaction} />
      ))
    ) : (
      <ReactionSkeleton />
    );
    return (
      <Grid container spacing={8}>
        <Grid item sm={8} xs={12}>
          {recentReactionsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}
Home.propTypes = {
  getReactions: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapState = (state) => ({
  data: state.data,
});

const mapActions = {
  getReactions,
};
export default connect(mapState, mapActions)(Home);
