import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Typography,
} from "@material-ui/core";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import Axios from "axios";
import CustomModel from "../../Shared/component/customModel";
import KpaForm from "../forms/kpaForms";
const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 10,
    borderLeft: (props) => `4px solid ${props.color.main}`,
  },
  paper: {
    padding: theme.spacing(1),
    width: "60%",
    backgroundColor: theme.palette.success.dark,
  },
}));

const NotifyCard = (props) => {
  const classes = useStyles(props);
  const { title, description, modified_on, type, color } = props;
  const [open, setOpen] = useState(false);

  const profileSubmit = async (arg) => {
    Axios.put(
      `https://kpa-backend.herokuapp.com/kpa/${props.id}?kpaId=${props._id}`,
      arg
    ).then((res) => {
      window.location.reload();
      handleClose();
    });
  };

  const handleDelete = () => {
    Axios.delete(
      `https://kpa-backend.herokuapp.com/kpa/${props.id}?kpaId=${props._id}`
    ).then((res) => {
      window.location.reload();
      handleClose();
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Draggable
      draggableId={props.id + "~" + title + "~" + type}
      index={props.index}
    >
      {(provided) => (
        <Card
          className={classes.root}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <CardHeader
            action={
              <IconButton
                aria-label="settings"
                color="primary"
                onClick={() => setOpen(true)}
              >
                <OpenInNewIcon />
              </IconButton>
            }
            titleTypographyProps={{ variant: "body1" }}
            title={title}
            subheader={new Date(modified_on).toDateString()}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
            {/* <Box
              bgcolor="success.main"
              color="background.paper"
              boxShadow={3}
              borderRadius="borderRadius"
              p={2}
              fontWeight="fontWeightMedium"
            >
              {type}
            </Box> */}
          </CardContent>
          <CustomModel open={open} handleClose={handleClose}>
            <KpaForm
              profileSubmit={profileSubmit}
              {...props}
              handleDelete={handleDelete}
              handleClose={handleClose}
            />
          </CustomModel>
        </Card>
      )}
    </Draggable>
  );
};

export default NotifyCard;

NotifyCard.defaultProps = {
  title: "Forms in React",
  description:
    "With supporting text below as a natural lead-in to additional content.",
  type: "component",
  modified_on: new Date(),
  name: "Dinesh S",
};
