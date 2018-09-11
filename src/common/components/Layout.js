import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import SearchAppBar from './AppBar';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

const Layout = props => {
  const { classes } = props;
  return (
    <Fragment>
      <SearchAppBar />
      <Paper className={classes.root} elevation={1}>
        {props.children}
      </Paper>
    </Fragment>
  );
};

Layout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Layout);
