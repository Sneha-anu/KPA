import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Rating from "@material-ui/lab/Rating";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
// import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import Tooltip from "@material-ui/core/Tooltip";

const CompletedRating = withStyles({
  iconFilled: {
    color: "#4caf50",
  },
})(Rating);

const PendingRating = withStyles({
  iconFilled: {
    color: "#ffc107",
  },
})(Rating);

const StyledRating = withStyles({
  iconFilled: {
    color: "lightgrey",
  },
})(Rating);

const CustomKpaStatus = ({ completed, pending, target }) => {
  return (
    <React.Fragment>
      <Tooltip title="Completed">
        <div>
          <CompletedRating
            name="completed-color"
            value={completed}
            max={completed}
            readOnly
            icon={<CheckCircleIcon fontSize="inherit" />}
          />
        </div>
      </Tooltip>

      <Tooltip title="In Progress">
        <div>
          <PendingRating
            name="pending-color"
            defaultValue={pending}
            readOnly
            max={pending}
            icon={<CheckCircleIcon fontSize="inherit" />}
          />
        </div>
      </Tooltip>
      <Tooltip title="Pending">
        <div>
          <StyledRating
            name="target-color"
            max={target - completed - pending}
            readOnly
            icon={<CheckCircleIcon fontSize="inherit" />}
          />
        </div>
      </Tooltip>
    </React.Fragment>
  );
};

export default CustomKpaStatus;

CustomKpaStatus.defaultProps = {
  target: 0,
  completed: 0,
  pending: 0,
};
