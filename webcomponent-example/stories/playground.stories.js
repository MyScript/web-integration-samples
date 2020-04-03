/* eslint-disable import/extensions */
import { html } from 'lit-html';
import { withKnobs, withWebComponentsKnobs, text } from '@open-wc/demoing-storybook';

import '../iink-element.js';

export default {
  title: 'iink-jsWc|Playground',
  component: 'iink-element',
  decorators: [withKnobs, withWebComponentsKnobs],
  parameters: { options: { selectedPanel: 'storybookjs/knobs/panel' } },
};

export const singleComponent = () => html`
  <iink-element type="TEXT" applicationKey="YOUR_APP_KEY" hmacKey="YOUR_HMAC_KEY"></iink-element>
`;

export const manualContent = () => html`
  <iink-element applicationKey="YOUR_APP_KEY" hmacKey="YOUR_HMAC_KEY">
    <p>${text('Content', 'Some text', 'Properties')}</p>
  </iink-element>
`;
