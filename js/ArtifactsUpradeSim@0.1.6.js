/**
 * ArtifactsUpgradeSim v0.1.6
 * Copyrigth 2021-2022 DioMao (https://github.com/DioMao/genshin_ArtifactsUpgradeSim_js/graphs/contributors)
 * Licensed under MIT (https://github.com/DioMao/genshin_ArtifactsUpgradeSim_js/blob/main/LICENSE)
 */
"use strict";

const ArtifactsSim = new ArtifactsFunction();
const ArtifactsSimVersion = "0.1.6";
console.log("%cArtifactsUpgradeSim is running.Learn more: https://github.com/DioMao/genshin_ArtifactsUpgradeSim_js", "color:rgb(144,82,41)");

// 词缀条目
const entryList = ["critRate", "critDMG", "ATK", "ATKPer", "def", "defPer", "HP", "HPPer", "energyRecharge", "elementMastery"],
    entryListCh = ["暴击率%", "暴击伤害%", "攻击力", "攻击力%", "防御力", "防御力%", "生命值", "生命值%", "充能效率%", "元素精通"],
    entryProbability = [0.3, 0.3, 0.75, 0.5, 0.75, 0.5, 0.75, 0.5, 0.3, 0.3],
    entryValue = {
        critRate: [2.7222, 3.1111, 3.5, 3.8889],
        critDMG: [5.4402, 6.2174, 7, 7.7718],
        ATK: [13.6111, 15.5556, 17.5, 19.4444],
        ATKPer: [4.0833, 4.6667, 5.25, 5.8333],
        def: [16.3333, 18.5, 21, 23.3333],
        defPer: [5.1031, 5.8321, 6.5611, 7.2901],
        HP: [209.125, 239, 268.875, 298.75],
        HPPer: [4.0833, 4.6667, 5.25, 5.8333],
        energyRecharge: [4.5325, 5.18, 5.8275, 6.475],
        elementMastery: [16.3333, 18.5, 21, 23.3333]
    },
    extraEnrtyRate = 0.3;

// 部件列表
const parts = ["feather", "flower", "hourglass", "hat", "cup"],
    partsCh = ["死之羽", "生之花", "时之沙", "理之冠", "空之杯"];

// 部件主词条列表
const feather = ["ATK"],
    flower = ["HP"],
    hourglass = ["ATKPer", "defPer", "HPPer", "elementMastery", "energyRecharge"],
    hat = ["critRate", "critDMG", "ATKPer", "defPer", "HPPer", "elementMastery", "HPRes"],
    cup = ["ATKPer", "defPer", "HPPer", "elementMastery", "water", "fire", "thunder", "rock", "wind", "ice", "Physical"],
    mainEntryList = ["ATK", "HP", "critRate", "energyRecharge", "HPRes", "critDMG", "ATKPer", "defPer", "HPPer", "elementMastery", "water", "fire", "thunder", "rock", "wind", "ice", "Physical"],
    mainEntryListCh = ["攻击力", "生命值", "暴击率", "元素充能效率", "治疗加成", "暴击伤害", "攻击力", "防御力", "生命值", "元素精通", "水元素伤害加成", "火元素伤害加成", "雷元素伤害加成", "岩元素伤害加成", "风元素伤害加成", "冰元素伤害加成", "物理伤害加成"];

const cusEntryList = {
    feather: feather,
    flower: flower,
    hourglass: hourglass,
    hat: hat,
    cup: cup
};

// 部件主词条概率
const hourglassRate = [0.26, 0.26, 0.26, 0.1, 0.1],
    hatRate = [0.1, 0.1, 0.22, 0.22, 0.22, 0.04, 0.1],
    cupRate = [0.21, 0.21, 0.21, 0.025, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05];

// 圣遗物主词条属性
const mainEntryValueList = {
    ATK: [47, 100, 152, 205, 258, 311],
    HP: [717, 1530, 2342, 3156, 3967, 4780],
    critRate: [4.7, 9.9, 15.3, 20.5, 25.8, 31.1],
    energyRecharge: [7.8, 16.5, 25.4, 34.2, 43, 51.8],
    HPRes: [5.4, 11.5, 17.6, 23.7, 29.8, 35.9],
    critDMG: [9.3, 19.9, 30.5, 41, 51.6, 62.2],
    ATKPer: [7, 14.9, 22.8, 30.8, 38.7, 46.6],
    defPer: [8.7, 18.6, 28.6, 38.5, 48.4, 58.3],
    HPPer: [7, 14.9, 22.8, 30.8, 38.7, 46.6],
    elementMastery: [28, 60, 91, 123, 155, 187],
    water: [7, 14.9, 22.8, 30.8, 38.7, 46.6],
    fire: [7, 14.9, 22.8, 30.8, 38.7, 46.6],
    thunder: [7, 14.9, 22.8, 30.8, 38.7, 46.6],
    rock: [7, 14.9, 22.8, 30.8, 38.7, 46.6],
    wind: [7, 14.9, 22.8, 30.8, 38.7, 46.6],
    ice: [7, 14.9, 22.8, 30.8, 38.7, 46.6],
    Physical: [8.7, 18.6, 28.6, 38.5, 48.4, 58.3]
};

// 圣遗物评分选项
const scoreList = ["atk", "crit", "def", "hp", "er", "em"],
    scoreListCH = ["攻击得分", "双暴得分", "防御得分", "生命得分", "充能得分", "精通得分"];

/**
 * 构造函数
 */
function ArtifactsFunction() {
    this.result = [];
    this.count = 0;
    this.history = [];
    this.backup = [];
    this.deleteHistory = [];
};

/**
 * 生成初始数据
 * @param {String} __part 指定位置，可为空
 * @param {String} __main 指定主词条，可为空
 * @param {Array} __entryArr 指定词条（至多四条），可为空
 * @param {Array} __entryRate 副词条数值（对应自选副词条），可为空
 * @returns {Object} 对象newArtifacts
 */
ArtifactsFunction.prototype.creatArtifact = function (__part = "", __main = "", __entry = [], __entryRate = []) {
    let newArtifacts = {
            level: 0,
            part: "none",
            mainEntry: "none",
            mainEntryValue: 0,
            entry: [],
            initEntry: '',
            upgradeHistory: [],
            creationDate: Date.now()
        },
        ArtifactEntry = [],
        ArtifactEntryRate = [];
    // 自选或随机位置
    if (typeof (__part) == "string" && parts.indexOf(__part) != -1) {
        newArtifacts.part = __part;
    } else {
        newArtifacts.part = parts[Math.floor((Math.random() * parts.length))];
    }
    // 自选或随机主属性
    if (typeof (__main) == "string" && mainEntryList.indexOf(__main) != -1 && mainEntryVerify(newArtifacts.part, __main)) {
        newArtifacts.mainEntry = __main;
    } else {
        newArtifacts.mainEntry = randomMainEntry(newArtifacts.part);
    }
    // 主属性数值
    newArtifacts.mainEntryValue = mainEntryValueList[newArtifacts.mainEntry][0];
    // 临时词条库（排除已有词条）
    for (let i = 0; i < entryList.length; i++) {
        entryList[i] == newArtifacts.mainEntry ? null : (ArtifactEntry.push(entryList[i]), ArtifactEntryRate.push(entryProbability[i]));
    }
    // 自选副词条
    if (__entry.length <= 4 && entryVerify(newArtifacts.mainEntry, __entry)) {
        for (let i = 0; i < __entry.length; i++) {
            let cusEntry = __entry[i],
                cusEntryRate = __entryRate[i],
                index = ArtifactEntry.indexOf(cusEntry);
            // 从临时词条库中移除已有词条，避免重复
            ArtifactEntry.splice(index, 1);
            ArtifactEntryRate.splice(index, 1);
            // 判断自选副词条数值是否合规
            if (__entryRate.length == 0 || typeof (cusEntryRate) != "number" || entryValue[cusEntry].indexOf(cusEntryRate) == -1) {
                cusEntryRate = randomEntryValue(__entry);
            }
            newArtifacts.entry.push([cusEntry, cusEntryRate]);
        }
    }
    // 随机词条/+若自选词条数量不到3条则补至3条
    while (newArtifacts.entry.length < 3) {
        //临时词条库
        let newEntry = randomRate(ArtifactEntry, ArtifactEntryRate),
            newEntryRate = randomEntryValue(newEntry),
            index = ArtifactEntry.indexOf(newEntry);
        // 从临时词条库中移除已有词条，避免重复
        ArtifactEntry.splice(index, 1);
        ArtifactEntryRate.splice(index, 1);
        newArtifacts.entry.push([newEntry, newEntryRate]);
    }
    // 是否拥有初始四词条
    if (__entry.length == 0 && Math.random() < extraEnrtyRate) {
        let newEntry = randomRate(ArtifactEntry, ArtifactEntryRate);
        newArtifacts.entry[3] = [newEntry, randomEntryValue(newEntry)];
    }
    // 保存初始状态
    newArtifacts.initEntry = JSON.stringify(newArtifacts.entry);
    // 保存结果
    this.result.push(newArtifacts);
    this.count++;
    // console.log(newArtifacts);
    return newArtifacts;
}

/**
 * 升级强化
 * @param {Number} __index 序号
 * @param {String} __entry 指定强化的词条（默认空值）
 * @param {Number} __upLevel 强化数值的级别(0-3，3最高)
 * @returns 升级结果
 */
ArtifactsFunction.prototype.upgrade = function (__index, __entry = "", __upLevel = -1) {
    if (__index >= this.result.length || __index < 0) return false;
    let currentArtifact = this.result[__index],
        currentEntry = [],
        currentEntryList = [],
        currentEntryRate = [];
    // 判断圣遗物是否满级
    if (currentArtifact.level >= 20) {
        // console.log("Upgrade failed,this Artifact is fully rated.");
        return false;
    };
    // 是否需要补充词条
    if (currentArtifact.entry.length < 4) {
        for (let i = 0; i < currentArtifact.entry.length; i++) {
            currentEntry.push(currentArtifact.entry[i][0]);
        }
        // 挑选可用词条（避免与其余词条重复）
        for (let i = 0; i < entryList.length; i++) {
            if (currentEntry.indexOf(entryList[i]) < 0) {
                currentEntryList.push(entryList[i]);
                currentEntryRate.push(entryProbability[i]);
            }
        }
        let addEntry = randomRate(currentEntryList, currentEntryRate),
            addRate = randomEntryValue(addEntry);
            currentArtifact.entry.push([addEntry, addRate]);
            currentArtifact.upgradeHistory.push([addEntry, addRate]);
        // console.log("Upgrade success,new entry is " + addEntry + " + " + addRate);
    } else {
        let upIndex = 0,
            upEntry = "",
            upRate = 0;
        // 优先升级自选词条
        if (__entry != "" && entryList.indexOf(__entry) >= 0) {
            for (let i = 0; i < currentArtifact.entry.length; i++) {
                if (__entry == currentArtifact.entry[i][0]) {
                    upIndex = i;
                    upEntry = currentArtifact.entry[i][0];
                }
            }
        } else {
            // 升级随机词条
            upIndex = Math.floor(Math.random() * currentArtifact.entry.length);
            upEntry = currentArtifact.entry[upIndex][0];
        }
        if (__upLevel != -1 && typeof (__upLevel) == "number" && Math.floor(__upLevel) < entryValue[upEntry].length) {
            upRate = entryValue[upEntry][Math.floor(__upLevel)];
        } else {
            upRate = randomEntryValue(upEntry);
        }
        // console.log("Upgrade success," + upEntry + " + " + upRate);
        currentArtifact.entry[upIndex][1] += upRate;
        currentArtifact.upgradeHistory.push([upEntry, upRate]);
    }
    // 增加等级
    currentArtifact.level += 4;
    // 增加主属性
    currentArtifact.mainEntryValue = mainEntryValueList[currentArtifact.mainEntry][currentArtifact.level/4];
    return true;
}

/**
 * 圣遗物得分计算
 * @param {*} __index 需要计算的圣遗物序号 
 * @param {String/Array} __rule 计算规则，可以为字符串和数组
 * @returns 得分
 */
ArtifactsFunction.prototype.ArtifactScore = function (__index, __rule = "default") {
    if (__index >= this.result.length || __index < 0) {
        return 0;
    }
    // 计分标准（待完善）
    let scoreStandar = {
        critRate: 2,
        critDMG: 1,
        ATK: 0.13,
        ATKPer: 1.345,
        def: 0.11,
        defPer: 1.07,
        HP: 0.0087,
        HPPer: 1.345,
        energyRecharge: 1.2,
        elementMastery: 0.339
    }
    let atkScore = 0,
        critScore = 0,
        defScore = 0,
        HPScore = 0,
        rechargeScore = 0,
        EMScore = 0,
        totalScore = 0,
        entryArr = this.result[__index].entry;
    for (let i = 0; i < entryArr.length; i++) {
        let entryNow = entryArr[i][0],
            addScore = entryArr[i][1] * scoreStandar[entryNow];
        if (entryNow == "ATK" || entryNow == "ATKPer") {
            atkScore += addScore;
        } else if (entryNow == "critRate" || entryNow == "critDMG") {
            critScore += addScore;
        } else if (entryNow == "def" || entryNow == "defPer") {
            defScore += addScore;
        } else if (entryNow == "HP" || entryNow == "HPPer") {
            HPScore += addScore;
        } else if (entryNow == "energyRecharge") {
            rechargeScore += addScore;
        } else if (entryNow == "elementMastery") {
            EMScore += addScore;
        }
    }
    if (Array.isArray(__rule)) {
        for (let i = 0; i < __rule.length; i++) {
            switch (__rule[i]) {
                case "atk":
                    totalScore += atkScore;
                    break;
                case "crit":
                    totalScore += critScore;
                    break;
                case "def":
                    totalScore += defScore;
                    break;
                case "hp":
                    totalScore += HPScore;
                    break;
                case "er":
                    totalScore += rechargeScore;
                    break;
                case "em":
                    totalScore += EMScore;
                    break;
                default:
                    totalScore += 0;
                    break;
            }
        }
    } else {
        __rule = __rule.toLowerCase();
        switch (__rule) {
            case "default":
                return atkScore + critScore;
            case "atk":
                return atkScore;
            case "crit":
                return critScore;
            case "def":
                return defScore;
            case "hp":
                return HPScore;
            case "er":
                return rechargeScore;
            case "em":
                return EMScore;
        }
    }
    return totalScore;
    // return {"atkScore":atkScore,"critScore":critScore,"defScore":defScore,"HPScore":HPScore,"rechargeScore":rechargeScore,"EMScore":EMScore};
}

/**
 * 圣遗物重置初始状态
 * @param {Number} __index 序号
 */
ArtifactsFunction.prototype.reset = function (__index) {
    let currentArtifact = this.result[__index];
    currentArtifact.entry.length = 0;
    currentArtifact.entry = JSON.parse(currentArtifact.initEntry);
    currentArtifact.upgradeHistory.length = 0;
    currentArtifact.level = 0;
    currentArtifact.mainEntryValue = mainEntryValueList[currentArtifact.mainEntry][0];
}

/**
 * 重置全部圣遗物状态
 */
ArtifactsFunction.prototype.resetAll = function () {
    for (let i = 0; i < this.result.length; i++) {
        this.reset(i);
    }
}

/**
 * 删除指定数据
 * @param {number} __del 要删除的遗物序号
 */
ArtifactsFunction.prototype.deleteOne = function (__del) {
    this.deleteHistory.push(this.result.splice(__del, 1)[0]);
}

/**
 * 批量删除指定数据
 * @param {Array} __delArr 要删除的遗物序号（数组）
 */
ArtifactsFunction.prototype.batchDelete = function (__delArr) {
    __delArr.sort((a, b) => a - b);
    for (let i = __delArr.length - 1; i >= 0; i--) {
        this.deleteHistory.push(this.result.splice(__delArr[i], 1)[0]);
    }
}

/**
 * 清空数据
 */
ArtifactsFunction.prototype.clearAll = function () {
    // 备份原数据
    if (this.backup.length != 0) this.backup.length = 0;
    this.backup = JSON.parse(JSON.stringify(this.result));
    this.result.length = 0;
}

/**
 * 撤销删除（对deleteOne删除的数据生效）
 * @returns 结果
 */
ArtifactsFunction.prototype.undoDel = function () {
    if (this.deleteHistory.length == 0) {
        console.log("Undo false, history not found.");
        return false;
    }
    this.result.push(this.deleteHistory.pop());
    return true;
}

/** 辅助函数 **/

/**
 * 模拟器版本检查
 * @returns 检查结果
 */
function versionCheck() {
    let storage = window.localStorage;
    if (!storage) {
        alert("浏览器不支持localstorage");
        return false;
    } else {
        if (storage.ArtifactsSimVersion == undefined) {
            storage.ArtifactsSimVersion = ArtifactsSimVersion;
            return true;
        } else if (storage.ArtifactsSimVersion != ArtifactsSimVersion) {
            alert("模拟器版本更新，如果遇到错误，请尝试清除浏览器缓存!");
            storage.ArtifactsSimVersion = ArtifactsSimVersion;
            return false;
        }
    }
    return true;
}
versionCheck();

/**
 * 根据数组随机概率
 * @param {Array} __arr1  随机列表
 * @param {Array} __arr2  随机概率（对应arr1）
 */
function randomRate(__arr1, __arr2) {
    if (__arr1.length != __arr2.length) {
        console.log("Warning!Array length different!");
    }
    let __rand = Math.random(),
        __rate = 0,
        __totalRate = 0;
    for (let __i = 0; __i < __arr2.length; __i++) {
        __totalRate += __arr2[__i];
    }
    __rand *= __totalRate;
    for (let __i = 0; __i < __arr2.length; __i++) {
        __rate += __arr2[__i];
        if (__rand <= __rate) {
            return __arr1[__i];
        }
    }
    return __arr1[__arr1.length - 1];
}

/**
 * 主词条合规验证
 * @param {String} __part 位置
 * @param {String} __main 主词条
 * @returns {Boolean} true/false
 */
function mainEntryVerify(__part, __main) {
    if (typeof (__part) != "string" || typeof (__main) != "string") return false;
    if (parts.indexOf(__part) != -1 && mainEntryList.indexOf(__main) != -1) {
        if (cusEntryList[__part].indexOf(__main) != -1) {
            return true;
        }
        return false;
    }
    return false;
}

/**
 * 随机主词条
 * @param {String} __part 位置
 */
function randomMainEntry(__part) {
    switch (__part) {
        case "feather":
            return "ATK";
        case "flower":
            return "HP";
        case "hourglass":
            return randomRate(hourglass, hourglassRate);
        case "hat":
            return randomRate(hat, hatRate);
        case "cup":
            return randomRate(cup, cupRate);
        default:
            console.log("Error! -randomMainEntry-");
    }
}

/**
 * 自选副词条合规验证
 * @param {String} __mainEntry 主词条
 * @param {Array} __entryArr 副词条数组
 * @returns 
 */
function entryVerify(__mainEntry, __entryArr) {
    for (let i = 0; i < __entryArr.length; i++) {
        if (__mainEntry == __entryArr[i] || entryList.indexOf(__entryArr[i]) == -1) {
            return false;
        }
    }
    return true;
}

/** 
 * 随机副词条数值
 * @param {String} __entry 词条名称
 */
function randomEntryValue(__entry) {
    return entryValue[__entry][Math.floor(Math.random() * entryValue[__entry].length)];
}

/**
 * 词条汉化
 * @param {String} word 需要翻译成中文的词条
 * @param {*} type 词条的类型
 * @returns 翻译结果
 */
function toChinese(word, type) {
    if (type == "entry") {
        return entryListCh[entryList.indexOf(word)]
    } else if (type == "parts") {
        return partsCh[parts.indexOf(word)];
    } else if (type == "mainEntry") {
        return mainEntryListCh[mainEntryList.indexOf(word)];
    } else if (type == "score") {
        return scoreListCH[scoreList.indexOf(word)];
    }
    return "";
}

/**
 * 格式化主词条数值（用于展示）
 * @param {String} mainEntry 主词条名称
 * @param {Number} value 主词条数值
 * @returns 展示用数值
 */
function fomatMainEntryValue(mainEntry = "", value = 0){
    if(mainEntry == "ATK" || mainEntry == "HP" || mainEntry == "elementMastery"){
        value = toThousands(value);
    }else{
        value = value.toFixed(1) + "%";
    }
    return value;
}

/**
 * 副词条展示优化
 * 将词条展示为 攻击力+5.8% 这样的形式
 * @param {String} entry 副词条名称
 * @param {Number} value 副词条数值
 * @returns 结果（字符串）
 */
function formatEntry(entry, value, language = "en") {
    // 带百分号的词条
    let percentEntry = ["critRate", "critDMG", "ATKPer", "defPer", "HPPer", "energyRecharge"],
        resEntry = entry,
        resValue = Number(value.toFixed(2));
    if (language == "ch") resEntry = toChinese(entry, "entry");
    if (percentEntry.indexOf(entry) != -1) {
        // resEntry = resEntry.replace("%", "");
        resValue += "%";
    }
    return resEntry + "+" + resValue;
}

/**
 * 数字千位分割（加逗号）
 * @param {Number | Srting} val 待转化的数字
 * @returns 转换结果（字符串）
 */
function toThousands(val) {
    return (val || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}