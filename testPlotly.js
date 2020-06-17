// let the window finish loading before we make the plot...
window.addEventListener("load", () => {
  console.log("... window loaded...");
  //let TESTER = document.getElementById("tester");
  Plotly.newPlot(
    //TESTER,
    tester,
    [
      {
        x: [1, 2, 3, 4, 5],
        y: [1, 2, 4, 8, 16],
      },
    ],
    {
      margin: { t: 0 },
    }
  );
});
