
import '../temp/config';

const REPLACE_VALUES = [
  [ /{{HOSTNAME}}/g, window.location.hostname ],
  [ /{{HOST}}/g, window.location.host ],
  [ /{{ORIGIN}}/g, window.location.origin ],
  [ /{{PATHNAME}}/g, window.location.pathname ],
  [ /{{PORT}}/g, window.location.port ],
  [ /{{PROTOCOL}}/g, window.location.protocol ],
];

function setClientValues(config) {
  const newConfig = {};
  for (const key of Object.keys(config)) {
    let value = config[key];
    for (const replaceValue of REPLACE_VALUES) {
      value = value.replace(replaceValue[0], replaceValue[1]);
    }
    newConfig[key] = value;
  }

  return newConfig;
}

const config = setClientValues(window.__CONFIG__);

export default config;
