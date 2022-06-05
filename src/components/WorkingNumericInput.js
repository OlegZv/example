import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";

const WorkingNumericInput = ({ config, updateValue, hasError }) => {
  // need local value to take action when we update the checkbox

  const [fieldHasError, setFieldHasError] = useState(false);
  const [localValue, setLocalValue] = useState(config.default);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // right now, because it's contantly re-rendering this never gets a chance to run
    const isValid = localValue > config.max || localValue < config.min;
    console.log("Validating config id: " + config.id + " isValid: " + isValid);
    setFieldHasError(isValid);
    hasError(isEnabled && isValid);
    updateValue(config.id, { value: isEnabled ? localValue : "" });
  }, [
    localValue,
    isEnabled,
    config.isEnabled,
    config.id,
    config.max,
    config.min,
    setFieldHasError,
    hasError,
  ]);

  const onChange = (e) => {
    console.log("Update local value to " + e.target.value);
    setLocalValue(e.target.value);
  };
  const onEnable = (e) => {
    console.log("Update local enable to " + e.target.checked);
    setIsEnabled(e.target.checked);
  };
  return (
    <>
      <Checkbox
        checked={isEnabled}
        onChange={onEnable}
        inputProps={{ "aria-label": "controlled" }}
      />
      <TextField
        label={config.name}
        variant="outlined"
        error={fieldHasError && isEnabled}
        defaultValue={config.default}
        onChange={onChange}
        helperText={
          fieldHasError && isEnabled
            ? "Min: " + config.min + ", Max: " + config.max
            : ""
        }
      />
    </>
  );
};

export default WorkingNumericInput;
