"use client";

import { Box } from "@mui/material";
import styles from "./loading_overlay.module.scss";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";

function FacebookCircularProgress(props) {
  return (
    <Box sx={{ position: "relative" }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) => "#8dc640",
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </Box>
  );
}

export default function LoadingOverlay(props) {
  const message = props.message || [];
  return (
    <div
      className={`${styles["loading-overlay"]} ${
        props.show ? styles.active : ""
      } ${props.darkMode ? styles.darkMode : ""}}`}
    >
      <FacebookCircularProgress />
      {message.length > 0 &&
        message.map((item, index) => {
          return <p key={`loading-overlay-text-${index}`}>{item}</p>;
        })}
    </div>
  );
}
