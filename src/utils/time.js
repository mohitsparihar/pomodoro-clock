function toMMSS(timeInSeconds) {
    let mm = Math.floor(timeInSeconds / 60);
    let ss = Math.floor(timeInSeconds % 60);
    if (ss < 10) {
      ss = '0' + ss;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    return mm + ':' + ss;
  }

  function toMM(timeInSeconds) {
    return Math.floor(timeInSeconds / 60);
  }

  export default { toMMSS, toMM };