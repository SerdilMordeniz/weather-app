import React from 'react'
import { Box } from '@mui/system';

/**
 * Customizing the tooltip for the MultiLineChart
 */
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <Box sx= {{
                bgcolor: 'white',
                border: '1px solid gray',
                padding: 1
            }} >
                <p>{label}</p>
                <p>Description: {payload[0].payload.description}</p>
                <p className="tooltipMax">High temperature: {payload[0].value}°C
                </p>
                <p className="tooltipMin">Low temperature {payload[1].value}°C
                </p>
            </Box>
        );
    }
    return null;
};

export default CustomTooltip
