"use client";
import React, { Component } from "react";
import Link from "next/link";
import styles from "./page_wrapper.module.scss";
import { ThemeProvider, createTheme } from "@mui/material";
import { EventBus, HideDialog, ShowDialog } from "@/app/utilities/EventBus";
import LoadingOverlay from "../loading_overlay/loading_overlay";
import { DialogPack, GetDialogPack } from "@/app/configs/DialogConstants";
import { PropTypes } from "prop-types";
import BasicDialog from "../../dialogs/basic_dialog/ basic_dialog";
class PageWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLoading: true,
      loadingMessage: "",
      dialogPack: DialogPack,
    };

    this.currentDialogPriority = 0;
    this.dialogPacks = [];
    this.eventBusInitialized = false;
    this.resizeObserver = null;
  }

  componentDidMount() {
    this.initiateEventBus();

    setTimeout(() => {
      this.setState({ showLoading: false });
      ShowDialog(
        GetDialogPack({
          showDialog: true,
          dialogTitle: "NextJS Template",
          dialogMessage:
            "Welcome to Oaks Solution and Studio NextJS Template! Check README.md for more information.",
          dialogShowPrimaryButton: true,
          dialogPrimaryButtonLabel: "OK",
          dialogPrimaryButtonCallback: () => {
            HideDialog();
          },
        })
      );
    }, 1000);
  }

  componentWillUnmount() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }

    EventBus.remove("loading");
    EventBus.remove("loadingAPI");
    EventBus.remove("dialog");
  }

  initiateEventBus() {
    if (!this.eventBusInitialized) {
      EventBus.on("loading", data => {
        this.setState({
          showLoading: data.showLoading,
          loadingMessage: data.loadingMessage,
        });
        if ((data.autoClose || 0) > 0) {
          setTimeout(() => {
            this.setState({ showLoading: false });
          }, data.autoClose * 1000);
        }
      });

      EventBus.on("dialog", this.initDialog);

      this.eventBusInitialized = true;
    }
  }

  initDialog = data => {
    if (data.priority === 0) {
      this.currentDialogPriority = 0;
      if (this.dialogPacks.length > 0) {
        this.setState({
          dialogPack: this.dialogPacks[0],
        });
        this.dialogPacks.splice(0, 1);
      }
      this.setState({
        dialogPack: data.dialogPack,
      });
      return;
    }

    if (data.priority < this.currentDialogPriority) {
      this.dialogPacks.push(data.dialogPack);
      return;
    }
    this.setState({
      dialogPack: data.dialogPack,
    });
  };

  render() {
    const {
      showLoading,
      loadingMessage,
      profileDialog,
      showTopBar,
      isSticky,
      isFadeOut,
      userData,
      showPage,
      dialogPack,
    } = this.state;
    const {
      className,
      topCover,
      topBar,
      children,
      layoutType,
      showFooter,
      stickFooter,
    } = this.props;
    const NunitoTheme = createTheme({
      typography: {
        fontFamily: "inherit",
      },
    });

    return (
      <ThemeProvider theme={NunitoTheme}>
        <div
          className={`${styles.wrapper} ${className ?? ""}`}
          style={{
            opacity: showPage,
            height: showPage ? "auto" : 0,
          }}>
          <Link href="/pages/home">
            <div
              className={styles["top-cover"]}
              style={{
                height: topCover ? topCover : 0,
              }}></div>
          </Link>
          <div className={styles.container}>
            {topBar && <div className={styles.topBarHeight}></div>}
            {children}
          </div>
        </div>

        <LoadingOverlay show={showLoading} message={loadingMessage} />
        <BasicDialog dialogPack={dialogPack} />
      </ThemeProvider>
    );
  }
}

export default PageWrapper;

PageWrapper.propTypes = {
  className: PropTypes.string,
  topCover: PropTypes.number,
  topBar: PropTypes.element,
  children: PropTypes.element,
  layoutType: PropTypes.string,
  stickFooter: PropTypes.bool,
  showFooter: PropTypes.bool,
};

PageWrapper.defaultProps = {
  showFooter: true,
};
