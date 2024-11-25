import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import PropTypes from "prop-types";

export default function StepperAction({ step }) {
    const steps = ["Shipping", "Payment", "Review", "Done"];
    const index = steps.findIndex(
        (item) => item.toLowerCase() === step.toLowerCase()
    );
    return (
        <>
            <Box sx={{ width: "100%" }}>
                <Stepper activeStep={index} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        </>
    );
}

StepperAction.propTypes = {
    step: PropTypes.string,
};
