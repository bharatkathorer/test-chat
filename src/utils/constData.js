export const base_url = 'http://localhost:8000/';
export const standardName = (standard) => {
    if (standard == 1) {
        return '1 st';
    } else if (standard == 2) {
        return '2 nd';
    } else if (standard == 3) {
        return '3 rd';
    }
    return `${standard} th`;
}
export const getParameters = () => {
    let uri = window.location.href.split('?');
    if (uri.length == 2) {
        let vars = uri[1].split('&');
        let getVars = {};
        let tmp = '';
        vars.forEach(function (v) {
            tmp = v.split('=');

            if (tmp.length == 2)
                if (tmp[0] != 'page') {
                    getVars[tmp[0]] = tmp[1];
                }
        });
        return getVars;
    }
    return [];
}

export const makeParameter = (name = false, value = false, start = true, remove = null) => {
    var data = getParameters();
    if (name) {
        data[name] = value;
    }
    let param = '';
    Object.keys(data).forEach((key) => {
        if (data[key] != null) {
            if (param == '' && start) {
                param += '?';
            } else {
                if (remove != key) {
                    param += '&';
                }
            }
            if (remove != key) {
                param += `${key}=${data[key]}`;
            }
        }
    });
    return param;
}
export const arrayToParameters = (items) => {
    let param = '';
    Object.keys(items).forEach((key, index) => {
        if (items[key]) {
            if (index) {
                param += `&${key}=${items[key]}`;
            } else {
                param += `?${key}=${items[key]}`;
            }
        }
    });
    return param;
}

export function blankPage(link) {
    window.open(link, '_blank');
}

export const setPath = (page) => {
    let url = window.location.origin;
    const pathname = window.location.pathname;
    if (pathname !== '/') {
        url = url + pathname;
    }
    window.history.replaceState('', '', url + page);
}


export const calPercntage = (obtain, total) => {

    if (parseInt(total)) {
        return 0.00;
    }
    const per = ((parseInt(obtain)) / (parseInt(total)) * 100).toFixed(2);

    return per;
}
export const calGrade = (percentage) => {
    if (percentage > 90) {
        return 'A+';
    } else if (percentage > 80) {
        return 'A';
    } else if (percentage > 70) {
        return 'B+';
    } else if (percentage > 60) {
        return 'B';
    } else if (percentage > 50) {
        return 'C+';
    } else if (percentage > 40) {
        return 'C';
    } else if (percentage > 30) {
        return 'D+';
    }
    return 'D';
}

export function formatDateTypeTwo(date, type = 'date') {
    // let d = date.replace(/-/g, "/");
    let _date = new Date(date);

    if (type == 'time') {
        return (
            _date.toLocaleString("default", {month: "long"}) +
            " " +
            _date.getDate() +
            ", " +
            _date.getFullYear() +
            " " +
            format_two_digits(_date.getHours()) +
            ":" +
            format_two_digits(_date.getMinutes())

        );
    } else {
        return (
            _date.toLocaleString("default", {month: "long"}) +
            " " +
            _date.getDate() +
            ", " +
            _date.getFullYear()
        );
    }
}
