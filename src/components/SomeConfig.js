import React, { useEffect } from "react";
import { configDefaults } from "../components/someConfigDefault";
import { useState } from "react";
import Box from "@mui/material/Box";
import NumericConfigInput from "../components/NumericConfigInput";

const SomeConfig = () => {
  // The idea of this component: render a bunch of input field for each separate config item
  // When the input changes (whether numeric OR checkbox):
  // 1. validate config for max and min
  // 2. if valid and enabled, push config to the upper level --> set fromHasError to flase
  // 3. if not valid but enabled --> set fromHasError to true
  // 4. if not enabled --> set fromHasError to flase
  const [someConfig, setSomeConfig] = useState(configDefaults);
  const [formHasError, setFormHasError] = useState(true);
  const [transformedConfig, setTransformedConfig] = useState("");

  useEffect(() => {
    if (formHasError) {
      setTransformedConfig("Please correct the values");
    } else {
      // does some config transfomration
      let resultingConfig = "";
      someConfig.forEach((config) => {
        if (config.value) {
          resultingConfig += config.name + ": " + config + "; ";
        }
      });

      setTransformedConfig(resultingConfig.toUpperCase());
    }
  }, [formHasError, someConfig, setTransformedConfig]);

  const onConfigChange = (id, updatedValue) => {
    console.log("update value: " + id);
    console.log(updatedValue);
    setSomeConfig(
      someConfig.map((config) =>
        config.id === id ? { ...config, ...updatedValue } : config
      )
    );
  };
  return (
    <>
      <section className="main-section">
        <div className="card">
          <p>Welcome to the config transformation page!</p>
          <p>
            Note: By default when the page loads the values of each config are
            factory defaults.
          </p>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            {configDefaults.map((config) => {
              console.log("Rendering config input: " + config.name);
              return (
                <NumericConfigInput
                  key={config.id}
                  config={config}
                  updateValue={onConfigChange}
                  hasError={setFormHasError}
                />
              );
            })}

            {/* <NumericConfigInput
              config={configNumericDefaults[1]}
              updateValue={onConfigChange}
              hasError={setFormHasError}
            /> */}
          </Box>
          <h2>{transformedConfig}</h2>
        </div>
      </section>
    </>
  );
};

export default SomeConfig;
