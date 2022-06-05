import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";

const NumericConfigInput = ({ config, updateValue, hasError }) => {
  // need local value to take action when we update the checkbox

  const [fieldHasError, setFieldHasError] = useState(false);
  // these were needed when I was keeping the state of the numeric config input locally
  // and performed validaition here as well.
  //   const [localValue, setLocalValue] = useState(config.value);
  //   const [isEnabled, setIsEnabled] = useState(false);

  // I tried to do validaiton in the component itself, because if the component has
  // an error, then the transformedConfig field would just show "Plese fix the error"
  // but then I switched to just updating the value and "isEnabled"

  useEffect(() => {
    // right now, because it's contantly re-rendering this never gets a chance to run
    const isValid = config.value > config.max || config.value < config.min;
    console.log("Validating config id: " + config.id + " isValid: " + isValid);
    setFieldHasError(isValid);
    hasError(config.isEnabled && isValid);
  }, [
    config.value,
    config.isEnabled,
    config.id,
    config.max,
    config.min,
    setFieldHasError,
    hasError,
  ]);

  const onChange = (e) => {
    console.log("Value input changed");
    updateValue(config.id, { value: e.target.value });
  };
  const onEnable = (e) => {
    console.log("Checkbox input changed");
    updateValue(config.id, { isEnabled: e.target.checked });
  };
  return (
    <>
      <Checkbox
        checked={config.isEnabled}
        onChange={onEnable}
        inputProps={{ "aria-label": "controlled" }}
      />
      <TextField
        label={config.name}
        variant="outlined"
        error={fieldHasError && config.isEnabled}
        defaultValue={config.default}
        onChange={onChange}
        helperText={
          fieldHasError && config.isEnabled
            ? "Min: " + config.min + ", Max: " + config.max
            : ""
        }
      />
    </>
  );
};

export default NumericConfigInput;
