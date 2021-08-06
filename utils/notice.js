export const noticeOptions = {
    levels: ['info', 'success', 'warning', 'danger'],
    template: {title: null, body: '', icon: null, level: 'info', class: null, style: null, iconAs: null, delay: null, forever: null, fromId: null, toId: null, channel: null}
}
const getLevel = (level = null, retDef = true) => {
    return (level && typeof level === "string" && noticeOptions.levels.includes(level)) ? level : (retDef ? noticeOptions.template.level : null);
}
function notice(options = null, level = null) {
    let ret = null;

    if (options) {
        if (typeof options === "string") {
            ret = Object.assign(noticeOptions.template, { body: options });
        } else if (typeof options === "object" && Object.keys(options).length) {
            ret = { ...noticeOptions.template };
            Object.keys(ret).forEach((k) => {
                ret[k] =
                    options[k] === null || ["string","boolean","number"].includes(typeof(options[k]))
                        ? options[k]
                        : ret[k];
            });
        }
    }

    if (ret) ret.level = getLevel(level, false) || getLevel(ret.level);

    return ret;
}

export default notice;