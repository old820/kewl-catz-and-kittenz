import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MyButton from '../../util/MyButton';
import { likeReaction, unlikeReaction } from '../../redux/actions/dataActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

class LikeButton extends Component {
  likedAReaction = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.reactionId === this.props.reactionId
      )
    ) {
      return true;
    }
    return false;
  };

  likeAReaction = () => {
    this.props.likeReaction(this.props.reactionId);
  };

  unlikeAReaction = () => {
    this.props.unlikeReaction(this.props.reactionId);
  };

  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tooltipTitle="Like">
          <FavoriteBorderIcon color="primary" />
        </MyButton>
      </Link>
    ) : this.likedAReaction() ? (
      <MyButton tooltipTitle="Undo Like" onClick={this.unlikeAReaction}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tooltipTitle="Like" onClick={this.likeAReaction}>
        <FavoriteBorderIcon color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  reactionId: PropTypes.string.isRequired,
  likeReaction: PropTypes.func.isRequired,
  unlikeReaction: PropTypes.func.isRequired,
};

const mapState = (state) => ({
  user: state.user,
});

const mapActions = {
  likeReaction,
  unlikeReaction,
};

export default connect(mapState, mapActions)(LikeButton);
