import { CSSProperties, ReactChild } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Tabs, Tab, Box } from "@material-ui/core";

interface TabPanelProps {
  value: string | number;
  index: string | number;
  children: ReactChild;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return value === index ? <Box {...other}>{children}</Box> : <></>;
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index: string | number) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    alignSelf: "center",
  },
  tabs: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  tab: {
    minWidth: "auto",
  },
  primary: {
    background: theme.palette.primary.main,
  },
  secondary: {
    background: theme.palette.secondary.main,
  },
  error: {
    background: theme.palette.error.main,
  },
  info: {
    background: theme.palette.info.dark,
  },
  text_primary: {
    color: theme.palette.primary.main,
  },
  text_secondary: {
    color: theme.palette.secondary.main,
  },
  text_error: {
    color: theme.palette.error.main,
  },
  text_info: {
    color: theme.palette.info.dark,
  },
}));

export type ButtonTabProps = {
  id: string | number;
  label: string | JSX.Element;
  component: JSX.Element;
};
interface ButtonTabsProps {
  tabs: ButtonTabProps[];
  tab: string | number;
  setTab(tab: string | number): void;
  variant?: "scrollable" | "standard" | "fullWidth";
  indicator?: "primary" | "secondary" | "info" | "error";
  style?: CSSProperties;
}

const ButtonTabs = ({
  tabs,
  variant,
  tab,
  setTab,
  indicator,
  style,
}: ButtonTabsProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root} style={style}>
      <Tabs
        value={tab}
        variant={variant}
        scrollButtons="on"
        className={classes.tabs}
        classes={{ indicator: classes[indicator!] }}
      >
        {tabs.map((tab: ButtonTabProps, i: number) => (
          <Tab
            key={tab.id || i}
            label={tab.label}
            // icon={tab.icon}
            value={tab.id}
            {...a11yProps(tab.id)}
            onClick={() => setTab(tab.id)}
            onDragEnter={() => setTab(tab.id)}
            classes={
              {
                // selected: classes[`text_${indicator}`] || "",
              }
            }
          />
        ))}
      </Tabs>
      {tabs.map(
        (t: ButtonTabProps, i: number) =>
          t.component && (
            <TabPanel key={i} value={tab} index={t.id}>
              {t.component}
            </TabPanel>
          )
      )}
    </div>
  );
};

ButtonTabs.defaultProps = {
  variant: "scrollable",
  indicator: "primary",
};

export { ButtonTabs };
