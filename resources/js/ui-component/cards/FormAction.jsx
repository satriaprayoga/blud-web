import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material'
import { ButtonBase, Link, Tooltip } from '@mui/material';

import Avatar from '../extended/Avatar';

const FormAction = ({ title,icon,handleClick }) => {
    const theme = useTheme();

    return (
        <Tooltip title={title || 'Reference'} placement="left">
            <ButtonBase disableRipple onClick={(e)=>{e.preventDefault;handleClick()}}>
                <Avatar size="badge" color="primary" outline>
                    {icon}
                </Avatar>
            </ButtonBase>
        </Tooltip>
    )
}

FormAction.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.node,
    handleClick:PropTypes.func
}

export default FormAction