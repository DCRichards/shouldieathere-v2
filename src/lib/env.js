export default function env(name) {
  return process.env[`VUE_APP_${name}`];
}
