(function () {
    'use strict';
	let plotlyDiv="";
    const resizeObserverSymbol = Symbol('plotly resize observer');
    const create = function () {
		let container = document.getElementById("Full_Graph");
        plotlyDiv = document.createElement('div');
		console.log(plotlyDiv);
        plotlyDiv.style.height = '80%';
        plotlyDiv.style.width = '100%';
		
        container.innerHTML = '';
        container.appendChild(plotlyDiv);

        // Use ResizeObserver for responsive styling
        // https://github.com/plotly/plotly.js/issues/3984#issuecomment-506098853
        const resizeObserver = new ResizeObserver(() => {
            window.Plotly.Plots.resize(plotlyDiv);
        });
        resizeObserver.observe(plotlyDiv);
        plotlyDiv[resizeObserverSymbol] = resizeObserver;
    };

    const destroy = function () {
        if (!plotlyDiv || !plotlyDiv[resizeObserverSymbol]) {
            return;
        }
        plotlyDiv[resizeObserverSymbol].disconnect();
        window.Plotly.purge(plotlyDiv);
        plotlyDiv.parentNode.removeChild(plotlyDiv);
    };
	
	const plot = function (x, y) {
		const canvas = document.getElementById("Full_Graph");
		//const ctx = canvas.getContext('2d');
		//Full_Graph is now the container fo the plotly graph

        const trace = {
            x,
            y,
            mode: 'lines+markers',
            type: 'scatter'
        };
        const data = [trace];
        const layout = {
            autosize: true,
			paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)'
        };
        window.Plotly.newPlot(plotlyDiv, data, layout);
    };

    window.WebVIPlotly = {
        create,
        destroy,
		plot
    };
}());
