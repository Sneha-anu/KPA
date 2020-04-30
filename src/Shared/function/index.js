import { groupBy, countBy, orderBy, partition, find, sumBy } from "lodash";
// import { kpaModel } from "../function/initialData";

export const getGroupingKpa = (arr) => {
  return arr
    .map((el) => {
      return el.kpa.map((item) => {
        return {
          ...item,
          id: el.empId,
          name: el.name,
          designation: el.designation,
          target: el.target_kpa
        }; //   /Object.assign({}, item, { id: el.id })
      });
    })
    .flat(Infinity);
};

export const pieChartsData = (arr, type, kpa = []) => {
  if (arr.length === 0) {
    return [];
  }
  var target = arr.map((el) => el.target_kpa);
  var filteredArr = groupBy(getGroupingKpa(arr), "type");
  var lastStage = {};
  kpa.forEach((el) => {
    lastStage[el.name] = el.stage.length.toString();
  });
  var res = [];
  var res1 = [];
  for (let id in filteredArr) {
    const [completed, pending] = partition(
      filteredArr[id],
      (el) => el.stage === lastStage[id]
    );
    let count = sumBy(target, id);
    res.push({
      name: id + "-C",
      value: completed.length,
    });
    res.push({
      name: id + "-P",
      value: pending.length,
    });
    res.push({
      name: id + "-T",
      value: count - pending.length - completed.length,
    });
    res1.push({
      name: id,
      value: count,
    });
  }
  return [res1, res];
};

export const radarChartsData = (arr, type, kpa = []) => {
  if (arr.length === 0) {
    return [];
  }
  var filteredArr = groupBy(getGroupingKpa(arr), "type");
  var lastStage = {};
  kpa.forEach((el) => {
    lastStage[el.name] = el.stage.length.toString();
  });
  var res = [];

  for (let id in filteredArr) {
    const [completed, pending] = partition(
      filteredArr[id],
      (el) => el.stage === lastStage[id]
    );
    res.push({
      type: id,
      completed: completed.length,
      pending: pending.length,
    });
  }
  return res;
};

export const lineGraphData = (arr, type, kpa = []) => {
  if (arr.length === 0) {
    return [];
  }

  // var filteredArr = groupBy(getGroupingKpa(arr), (el) => {
  //   return new Date(el.modified_on).getMonth();
  // });
  var date = new Date();
  date.setDate(date.getDate() - 180);
  var filteredArr = getGroupingKpa(arr).filter(
    (el) => new Date(el.modified_on) >= date
  );
  // console.log(filteredArr, "awesds==============>");
  filteredArr = groupBy(filteredArr, (el) => {
    return new Date(el.modified_on).getMonth();
  });
  // console.log(filteredArr, "Sdsds==============>");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var lastStage = {};
  var zeroStage = {};
  kpa.forEach((el) => {
    lastStage[el.name] = el.stage.length.toString();
    zeroStage[el.name] = 0;
  });

  var today = new Date();
  var defaultRes = [];
  for (var i = 6; i >= 0; i -= 1) {
    let d;
    let month;

    d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    month = monthNames[d.getMonth()];
    defaultRes.push({ month: month, ...zeroStage });
  }

  var res = [];
  for (let id in filteredArr) {
    const groupedType = groupBy(
      filteredArr[id],
      (el) => el.type
      // (el) => el.stage === lastStage[el.type]
    );
    let resultType = {};
    Object.keys(groupedType).forEach((key) => {
      // console.log();
      resultType[key] = groupedType[key].filter(
        (el) => el.stage === lastStage[el.type]
      ).length;
    });
    // console.log(resultType, "Arr---->" + monthNames[id], groupedType);

    res.push({
      month: monthNames[id],
      ...zeroStage,
      ...resultType,
    });
  }
  // console.log(res, " groupedType");
  return defaultRes.map((el) => {
    const truthy = find(res, ["month", el.month]) || false;
    return truthy ? truthy : el;
  });
};

export const barGraphData = (arr, type, kpa = []) => {
  if (arr.length === 0 || type === "") {
    return [];
  }
  
  var filteredArr = getGroupingKpa(arr).filter((el) => el.type === type);

  var groupArr = groupBy(filteredArr, "name");

  var lastStage = find(kpa, ["name", type]).stage.length.toString() || "";
  var res = [];

  for (let id in groupArr) {
    const [completed, pending] = partition(
      groupArr[id],
      (el) => el.stage === lastStage
    );
    res.push({
      name: id,
      completed: completed,
      pending: pending,
      target: groupArr[id][0].target[groupArr[id][0].type],
      id: groupArr[id][0]["id"],
    });
  }
  res = res.map((el) => {
    return {
      ...el,
      completed: el.completed.length,
      pending: el.target - el.completed.length,
    };
  });

  return orderBy(res, ["completed"], ["desc"]).filter((_, idx) => idx < 4);
};

export const dataGroupByStage = (arr) => {
  var group = groupBy(arr, "stage");
  var res = {};
  for (let item in group) {
    res[item] = {
      id: item,
      title: item,
      taskIds: group[item],
    };
  }
  return res;
};

export const FilterBYType = (arr, type = "component") => {
  var res = getGroupingKpa(arr.profile);
  res = res.filter((el) => el.type === type);

  var kpastage = {};
  var kpaTitle = {};

  var target;
  arr.kpaCreation
    .filter((el) => el.name === type)
    .forEach((list) => {
      target = list.stage.length;
      list.stage.forEach((item) => {
        kpaTitle[item.id] = item;
        kpastage[item.id] = { ...item, taskIds: [] };
      });
    });
  res = Object.entries(groupBy(res, "name")).map((el) => {
    const dataGroupByStageProp = { ...dataGroupByStage(el[1]) };
    const countKPA = { pending: 0 };
    var resultStage = {};
    arr.profile
      .filter((ite) => ite.name === el[0])
      .forEach((val) => {
        countKPA.target = val.target_kpa[type];
      });

    for (const [key, value] of Object.entries(dataGroupByStageProp)) {
      parseInt(value.id) === target
        ? (countKPA["completed"] = value.taskIds.length)
        : (countKPA.pending = countKPA.pending + value.taskIds.length);
      resultStage[key] = {
        ...dataGroupByStageProp[key],
        ...kpaTitle[key],
      };
    }
    // console.log(dataGroupByStageProp, resultStage, "ResultStaetef");
    return [[el[0]], { ...kpastage, ...resultStage }, countKPA, el[1][0]["id"]];
  });
  return res;
};

// export const getKPATitle = (type = "component") => {
//   var kpastage = {};
//   kpaModel
//     .filter((el) => el.name === type)
//     .forEach((list) => {
//       list.stage.forEach((item) => {
//         kpastage[item.id] = { ...item };
//       });
//       //console.log(...stage,'item')
//     });
//   return kpastage;
// };

export const FilterByName = (arr, id = 51827270) => {
  var res = getGroupingKpa(arr.profile);
  res = res.filter((el) => el.id === id);
  var target;
  res = Object.entries(groupBy(res, "type")).map((el) => {
    const dataGroupByStageProp = dataGroupByStage(el[1]);
    const countKPA = { pending: 0, completed: 0 };
    let kpastage = {};
    let kpaTitle = {};
    var resultStage = {};
    arr.kpaCreation
      .filter((kpa) => kpa.name === el[0])
      .forEach((list) => {
        target = list.stage.length;
        list.stage.forEach((item) => {
          // console.log(item);
          kpaTitle[item.id] = item;
          kpastage[item.id] = { ...item, taskIds: [] };
        });
      });

    arr.profile
      .filter((ite) => ite.empId === id)
      .forEach((val) => {
        // console.log(val.target_kpa, "val");
        countKPA.target = val.target_kpa[el[0]];
      });
    for (const [key, value] of Object.entries(dataGroupByStageProp)) {
      // console.log(key, value);
      parseInt(value.id) === target
        ? (countKPA["completed"] = value.taskIds.length)
        : (countKPA.pending = countKPA.pending + value.taskIds.length);
      resultStage[key] = {
        ...value,
        ...kpaTitle[key],
      };
    }

    return [[el[0]], { ...kpastage, ...resultStage }, countKPA, el[0]];
  });
  return res;
};

export const fetchCountOverAll = (arr) => {
  //  var filteredArr = getGroupingKpa(arr);

  var countByType = countBy(arr, "type");
  var res = [];
  for (let id in countByType) {
    res.push({ name: id, value: countByType[id] });
  }
  return res;
};

export const getRecentKPAModification = (arr) => {
  var filteredArr = getGroupingKpa(arr);
  var date = new Date();
  date.setDate(date.getDate() - 30);
  filteredArr = orderBy(filteredArr, ["modified_on"], ["desc"]);
  return filteredArr
    .filter((el) => new Date(el.modified_on) >= date)
    .slice(0, 4);
};

export const getDesignationLabel = (role) => {
  const designation = [
    {
      role: "SE",
      label: "Software Engineer",
    },
    {
      role: "LE",
      label: "Lead Engineer",
    },
    {
      role: "TL",
      label: "Technical Lead",
    },
    {
      role: "TM",
      label: "Technical Manager",
    },
    {
      role: "TE",
      label: "Technical Engineer",
    },
  ];
  return designation.find((el) => el.role === role)["label"];
};
