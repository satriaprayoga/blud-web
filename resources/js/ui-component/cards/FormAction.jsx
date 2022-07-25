import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material'
import { ButtonBase, Link, Tooltip } from '@mui/material';

import Avatar from '../extended/Avatar';
import { margin } from '@mui/system';

const FormAction = ({ title,icon,handleClick, titleEdit, iconEdit, handleEdit, titleDelete, iconDelete, handleDelete }) => {
    const theme = useTheme();

    return (
        <>
        {title &&
        <Tooltip title={title || 'Reference'} placement="left" sx={{margin:0.5}}>
        <ButtonBase disableRipple onClick={(e)=>{e.preventDefault;handleClick()}}>
            <Avatar size="badge" color="primary" outline>
                {icon}
            </Avatar>
        </ButtonBase>
    </Tooltip>
        }
        {titleDelete && 
        <Tooltip title={titleDelete || 'Reference'} placement="left" sx={{margin:0.5}}>
        <ButtonBase disableRipple onClick={(e)=>{e.preventDefault;handleDelete()}}>
            <Avatar size="badge" color="primary" outline>
                {iconDelete}
            </Avatar>
        </ButtonBase>
    </Tooltip>
        }
        {titleEdit && 
        <Tooltip title={titleEdit || 'Reference'} placement="left" sx={{margin:0.5}}>
        <ButtonBase disableRipple onClick={(e)=>{e.preventDefault;handleEdit()}}>
            <Avatar size="badge" color="primary" outline>
                {iconEdit}
            </Avatar>
        </ButtonBase>
    </Tooltip>
        }
        {/* <Tooltip title={title || 'Reference'} placement="left" sx={{margin:1}}>
        <ButtonBase disableRipple onClick={(e)=>{e.preventDefault;handleClick()}}>
            <Avatar size="badge" color="primary" outline>
                {icon}
            </Avatar>
        </ButtonBase>
    </Tooltip>
    <Tooltip title={title || 'Reference'} placement="left" sx={{margin:1}}>
    <ButtonBase disableRipple onClick={(e)=>{e.preventDefault;handleClick()}}>
        <Avatar size="badge" color="primary" outline>
            {icon}
        </Avatar>
    </ButtonBase>
</Tooltip> */}
        </>
    )
}

FormAction.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.node,
    handleClick:PropTypes.func
}

export default FormAction