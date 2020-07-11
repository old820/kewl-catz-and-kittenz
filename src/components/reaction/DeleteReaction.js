import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MyButton from '../../util/MyButton';
import { deleteReaction } from '../../redux/actions/dataActions';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const styles = {
  deleteButton: {
    position: 'absolute',
    left: '90%',
    top: '10%',
  },
};

class DeleteReaction extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  deleteAReaction = () => {
    this.props.deleteReaction(this.props.reactionId);
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tooltipTitle="Delete Reaction"
          btnClassName={classes.deleteButton}
          onClick={this.handleOpen}
        >
          <DeleteOutlineIcon color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogContent>
            Are you sure you want to delete this reaction?
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteAReaction} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}
DeleteReaction.propTypes = {
  deleteReaction: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  reactionId: PropTypes.string.isRequired,
};

const mapActions = {
  deleteReaction,
};
export default connect(null, mapActions)(withStyles(styles)(DeleteReaction));
