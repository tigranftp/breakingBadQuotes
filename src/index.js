import {BreakingBad} from "./api/breakingBad";
import * as d3 from "d3";
import { select } from "d3";

document.addEventListener("DOMContentLoaded", null)

document.getElementById("button").addEventListener("click", genQuote);



  function f() {


    function degToRad (degrees) {
      return degrees * Math.PI / 180;
    }
    
    // Returns a tween for a transition’s "d" attribute, transitioning any selected
    // arcs from their current angle to the specified new angle.
    function arcTween(newAngle, angle) {
      return function(d) {
        var interpolate = d3.interpolate(d[angle], newAngle);
        return function(t) {
          d[angle] = interpolate(t);
          return arc(d);
        };
      };
    }
  const animationTime = 500;
  const loaderRadius = 40;
  const loaderColor = '#ccc';
  
  var arc = d3.arc()
      .innerRadius(0)
      .outerRadius(loaderRadius);
  
  let svg = d3.select("svg"),
      width = +svg.attr("width"),
      height = +svg.attr("height"),
      g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  
  var loader = g.append("path")
      .datum({endAngle: 0, startAngle: 0})
      .style("fill", loaderColor)
      .attr("d", arc);
  
  d3.interval(function() {
    loader.datum({endAngle: 0, startAngle: 0})
    
    loader.transition()
        .duration(animationTime)
        .attrTween("d", arcTween(degToRad(360), 'endAngle'));
    
     loader.transition()
        .delay(animationTime)
        .duration(animationTime)
        .attrTween("d", arcTween(degToRad(360), 'startAngle'));
  }, animationTime * 2);



  }




  function genQuote(){
    const main = document.getElementById("main");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "qsvg")
    svg.setAttribute('width', '400');
    svg.setAttribute('height', '400');
    main.appendChild(svg);
    f();
    const div = document.createElement("div");
    const img = document.createElement("img");
    div.hidden= true;
    img.hidden= true;
    const bb = new BreakingBad();
    let myPromise = new Promise(function(myResolve, myReject) {
      bb.getRandomQuote().then(data => {
        const author = data[0].author;
        const quote = data[0].quote;
        bb.getCharacterInfoByName(bb.correctName(author)).then(characterInfo =>
        {
        img.src = characterInfo[0].img
        }
        
        
        )
        div.innerHTML = quote + " (C) " + author
        main.appendChild(div);
        main.appendChild(img);
        })
        setTimeout(() => {myResolve(); }, "5000")
        
      });


    myPromise.then( () =>{
      d3.select("svg").remove()
      div.hidden= false;
      img.hidden= false;
    }
      )
    }
