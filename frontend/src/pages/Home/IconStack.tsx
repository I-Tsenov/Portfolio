import React from 'react';
import FlexBox from '@src/components/FlexBox';
import Tooltip from '@src/components/Tooltip';
import { ReactComponent as CssIcon } from '@assets/css_icon.svg';
import { ReactComponent as HtmlIcon } from '@assets/html_icon.svg';
import { ReactComponent as JavascriptIcon } from '@assets/javascript_icon.svg';
import { ReactComponent as ReactIcon } from '@assets/react_icon.svg';
import { ReactComponent as ReduxIcon } from '@assets/redux_icon.svg';
import { ReactComponent as MobxIcon } from '@assets/mobx_icon.svg';
import { ReactComponent as SassIcon } from '@assets/sass_icon.svg';
import { ReactComponent as MuiIcon } from '@assets/material_ui_icon.svg';

const IconStack: React.FC = () => {
    return (
        <FlexBox align="center" direction="row" gap={2} directionMobile="column" gapMobile={1}>
            <span>
                <strong>Tech Stack:</strong>
            </span>
            <FlexBox gap={1} wrap="wrap">
                <Tooltip content="Cascading Style Sheets">
                    <CssIcon />
                </Tooltip>
                <Tooltip content="HyperText Markup Language">
                    <HtmlIcon />
                </Tooltip>
                <Tooltip content="Javascript">
                    <JavascriptIcon />
                </Tooltip>
                <Tooltip content="Javascript">
                    <ReactIcon />
                </Tooltip>
                <Tooltip content="Redux Toolkit">
                    <ReduxIcon />
                </Tooltip>
                <Tooltip content="MobX state manager">
                    <MobxIcon />
                </Tooltip>
                <Tooltip content="Syntactically Awesome Stylesheets">
                    <SassIcon />
                </Tooltip>
                <Tooltip content="Material UI">
                    <MuiIcon />
                </Tooltip>
            </FlexBox>
        </FlexBox>
    );
};

export default IconStack;
