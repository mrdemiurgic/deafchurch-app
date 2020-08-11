import React, { useRef } from 'react';

import Clipboard from 'react-clipboard.js';
import ReactTooltip from 'react-tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faCopy,
  faPhoneVolume,
} from '@fortawesome/free-solid-svg-icons';

import buttons from '../../styles/buttons.module.css';
import colors from '../../styles/colors.module.css';

type ContactType = 'email' | 'phone' | 'videoPhone';

interface Props {
  type: ContactType;
  data: string;
}

export default (props: Props): JSX.Element => {
  const { type, data } = props;

  const action = () => {
    window.location.href = `${type === 'email' ? 'mailto' : 'tel'}:${data}`;
  };

  const tooltipRef = useRef<Clipboard>(null);

  return (
    <div className={buttons.buttonsContainer} style={{ padding: 0 }}>
      <div
        className={buttons.buttonContainer}
        style={{ width: '50%', paddingRight: '2.5px' }}
      >
        <Clipboard
          className={`${buttons.button} ${colors.buttonNeutral}`}
          data-clipboard-text={data}
          style={{ fontSize: '1.1em' }}
          ref={tooltipRef}
          data-tip="Copied!"
          onSuccess={() =>
            tooltipRef.current !== null &&
            ReactTooltip.show(tooltipRef.current as any)
          }
        >
          <FontAwesomeIcon icon={faCopy} className={buttons.icon} />
          <div className={buttons.text}>Copy</div>
        </Clipboard>
        <div data-tip="Copied!" />
        <ReactTooltip place="top" effect="solid" scrollHide />
      </div>
      <div
        className={buttons.buttonContainer}
        style={{ width: '50%', paddingLeft: '2.5px' }}
      >
        <button
          type="button"
          className={`${buttons.button} ${colors.buttonPrimary}`}
          onClick={action}
          style={{ fontSize: '1.1em' }}
        >
          <FontAwesomeIcon
            icon={type === 'email' ? faPaperPlane : faPhoneVolume}
            className={buttons.icon}
          />
          <div className={buttons.text}>
            {type === 'email' ? 'Send' : 'Call'}
          </div>
        </button>
      </div>
    </div>
  );
};
