const funcs = require('./funcs');
const ls = require('./latexsnips');

const notes = (year) => {
  const table = ls.tabularx({
    hlines: true,
    colSetup: '|@{}' + (new Array(10).fill('X').join('@{}|@{}')) + '@{}|',
    matrix: funcs
      .range(0, 10)
      .map(
        i => funcs
          .range(i * 10 + 1, i * 10 + 11)
          .map(
            num => funcs
              .interpolateTpl(
                'monthlyCornerDate',
                {date: ls.link(`Note ${num}`, num)}) + '\\vspace{1.35cm}'
          )
      )
  })

  const refText = 'Notes Index';
  const notesPages = funcs
    .range(0, 100)
    .map(num => {
      const page = funcs.interpolateTpl('notePage', {});

      return `${ls.header([ls.slink(year), ls.slink(refText), ls.starget(`Note ${num+1}`)])}${page}`;
    }).join('\\pagebreak\n')

  return `${ls.header([ls.slink(year), ls.starget(refText)])}
${funcs.interpolateTpl('notesIndex', {table})}
\\pagebreak
${notesPages}`;
};

module.exports.notes = notes;