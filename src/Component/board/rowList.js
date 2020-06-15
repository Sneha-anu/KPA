import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Column } from "./column";
import ExpansionPanel from "../../Shared/component/expansionPanel";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const styless = (theme) => ({
  root: {
    flexGrow: 1,
  },
  background: {
    borderRadius: "8px",
    // padding: theme.spacing(1),
    borderRight: "22px solid white",
    background: theme.palette.divider,
  },
  stage2: {
    background: "#00b5ad",
    // padding: "10px 20px",
    // marginLeft: "-28px",
    // marginTop: "0",
    // marginBottom: "10px",
    // position: "relative",
    // width: "70%",
    // boxShadow: "1px 1px 3px #00b5ad",
    // borderRadius: "4px 4px 4px 0",
  },
  title: {
    color: "#fff",
    fontSize: "16px",
  },
  arrow: {
    width: "0",
    height: "0",
    lineHeight: "0",
    borderLeft: "20px solid transparent",
    borderTop: "10px solid #00b5ad",
    top: "104%",
    left: "0",
    position: "absolute",
  },
});

class RowList extends React.Component {
  state = {
    columns: this.props.data,
    columnOrder: Object.keys(this.props.data),
  };

  DragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    // reordering in same list
    if (result.source.droppableId === result.destination.droppableId) {
      return;
    }
    this.props.changeStage(result);
  };

  render() {
    // console.log(this.state, "roe", this.props);
    // const classes = useStyles();
    const { classes, data, name, id, status, type } = this.props;
    const keyData = Object.keys(data);
    // const root = { flexGrow: 1 };
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid container item xs={12}>
            <ExpansionPanel name={name} id={id} type={type} status={status}>
              <DragDropContext onDragEnd={this.DragEnd}>
                {keyData.map((columnId, index) => (
                  <Grid
                    item
                    xs
                    key={columnId + data[columnId]["title"]}
                    className={classes.background}
                  >
                    <Box
                      component="div"
                      p={1.5}
                      mb={1}
                      style={{ opacity: "0.85", borderRadius: "5px 5px 0 0" }}
                      bgcolor="text.primary"
                    >
                      <Typography className={classes.title}>
                        {data[columnId]["title"]}
                        <span className={classes.arrow}></span>
                      </Typography>
                    </Box>
                    <Column task={data[columnId]} index={index} />
                  </Grid>
                ))}
              </DragDropContext>
            </ExpansionPanel>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styless)(RowList);
RowList.defaultProps = {
  id: 51827270,
};
