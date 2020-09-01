
let cells = ['1'];

function update() {
    cells.push(''+(cells.length+1));
    if (cells.length>5) { cells = ['1']; }
    setTimeout(update, 1000);
    m.redraw();
}
update();

m.mount(root, {view: () => m('.gridExample', m(hsWidget.GridColumns, { 
        class: 'colGrid',
        style:'background-color:#ffe; padding:20px 0;',
        gap:"5px 5px",
        template:'50px auto auto 50px', 
    }, [
        '<',
        m(hsWidget.GridRows, {class:'rowGrid'}, cells),
        m(hsWidget.GridRows, {class:'rowGrid'}, cells),
        '>'
    ]),
)});
