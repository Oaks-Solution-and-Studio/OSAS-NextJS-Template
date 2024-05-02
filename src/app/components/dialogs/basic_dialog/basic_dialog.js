// components/BasicDialog.js
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const BasicDialog = ({ dialogPack }) => {
  const {
    showDialog,
    dialogTitle,
    dialogMessage,
    dialogListInfo,
    dialogShowPrimaryButton,
    dialogPrimaryButtonLabel,
    dialogPrimaryButtonCallback,
    dialogShowSecondaryButton,
    dialogSecondaryButtonLabel,
    dialogSecondaryButtonCallback,
    dialogShowCheckBox,
    dialogCheckBoxMessage,
    dialogSecondaryAsRealMain,
  } = dialogPack;

  return (
    <Dialog
      open={showDialog}
      onClose={() => {}} // Define how you handle close action
      aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogMessage}</DialogContentText>
        {dialogShowCheckBox && (
          <FormControlLabel
            control={<Checkbox onChange={dialogSecondaryButtonCallback} />}
            label={dialogCheckBoxMessage}
          />
        )}
      </DialogContent>
      <DialogActions>
        {dialogShowPrimaryButton && (
          <Button onClick={dialogPrimaryButtonCallback} color="primary">
            {dialogPrimaryButtonLabel}
          </Button>
        )}
        {dialogShowSecondaryButton && (
          <Button
            onClick={dialogSecondaryButtonCallback}
            color="secondary"
            autoFocus>
            {dialogSecondaryButtonLabel || "Cancel"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default BasicDialog;
