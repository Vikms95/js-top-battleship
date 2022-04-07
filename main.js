(()=>{"use strict";function e(e){const t=e;return{getName:()=>t,createGameBoard:(...e)=>{const t=function(){let e={A1:!1,A2:!1,A3:!1,A4:!1,A5:!1,A6:!1,A7:!1,A8:!1,B1:!1,B2:!1,B3:!1,B4:!1,B5:!1,B6:!1,B7:!1,B8:!1,C1:!1,C2:!1,C3:!1,C4:!1,C5:!1,C6:!1,C7:!1,C8:!1,D1:!1,D2:!1,D3:!1,D4:!1,D5:!1,D6:!1,D7:!1,D8:!1,E1:!1,E2:!1,E3:!1,E4:!1,E5:!1,E6:!1,E7:!1,E8:!1,F1:!1,F2:!1,F3:!1,F4:!1,F5:!1,F6:!1,F7:!1,F8:!1,G1:!1,G2:!1,G3:!1,G4:!1,G5:!1,G6:!1,G7:!1,G8:!1,H1:!1,H2:!1,H3:!1,H4:!1,H5:!1,H6:!1,H7:!1,H8:!1},t=[];const r=(...e)=>{const r=function(...e){let t=e;const r={1:"Spy",2:"Destroyer",3:"Cruiser",4:"Battleship",5:"Carrier"}[t.length];return{getShipName:()=>r,getShipCoord:()=>t,isSunkNextHit:()=>1===t.length,removeSquareHit:e=>{const r=(e=>t.indexOf(e))(e);t=t.filter((e=>t.indexOf(e)!==r))}}}(...e);return t=n(r),o(r),r},o=t=>{const r=t.getShipCoord();let o=0;for(const[t]of Object.entries(e))t===r[o]&&(e[t]=!0,o++)},n=e=>[...t,e],a=t=>Object.assign({...e},{[`${t}`]:"Hit"}),i=e=>{const r=s(e);return t.filter((e=>t.indexOf(e)!==r))},s=e=>t.findIndex((t=>t.getShipName()===e.getShipName()));return{getBoardGrid:()=>e,getBoardShips:()=>t,createShip:r,populateGameboard:e=>{let t=0;for(;t<e.length;)r(...e[t]),t++},receiveAttackFromPlayer:(r="A1")=>{const o=r;if(!(t=>{for(const[r]of Object.entries(e))if(r===t&&e[r])return!0;return!1})(o))return o;{const r=(e=>t.find((t=>t.getShipCoord().includes(e))))(o);r.isSunkNextHit()?t=i(r):e=((e,t)=>(t.removeSquareHit(e),a(e)))(o,r)}},removeShipFromShipsArray:i,isAllShipsSunk:()=>0===t.length}}();return t.populateGameboard(e),t},sendAttackCoordsToGame:(e="A1")=>e,sendRandomAttackCoordsToGame:e=>{const t=Object.keys(e.getBoardGrid()).length,r=(o=0,n=t,Math.floor(Math.random()*(o-n))+n);var o,n;return Object.keys(e.getBoardGrid())[r]},isPlayerDefeated:e=>e.isAllShipsSunk()}}(function(){const t=(e,t,r)=>r===t?e:t,r=(e,t,r)=>r===t?e:t;return{setupGame:()=>{const o=e("Victor"),n=e("Olga"),a=o.createGameBoard(["A1"],["B1","B2"],["C1","C2","C3"],["D1","D2","D3","D4"],["E1","E2","E3","E4","E5"]),i=n.createGameBoard(["A1"],["B1","B2"],["C1","C2","C3"],["D1","D2","D3","D4"],["E1","E2","E3","E4","E5"]);let s=o,c=i;for(;!o.isPlayerDefeated(a)||!n.isPlayerDefeated(i);){const e=s.sendAttackCoordsToGame("A1");c.receiveAttackFromPlayer(e),c.isAllShipsSunk(),s=t(o,n),console.log(s),c=r(a,i),console.log(c)}}}})().setupGame()})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoibUJBRU8sU0FBU0EsRUFBT0MsR0FDbkIsTUFBTUMsRUFBY0QsRUFtQ3BCLE1BQU0sQ0FDRkUsUUFsQ1ksSUFDTEQsRUFrQ1BFLGdCQS9Cb0IsSUFBSUMsS0FDeEIsTUFBTUMsRUNSUCxXQUVILElBQUlDLEVBQ0osQ0FDSSxJQUFNLEVBQU8sSUFBTSxFQUFPLElBQU0sRUFBTyxJQUFNLEVBQU8sSUFBTSxFQUFPLElBQU0sRUFBTyxJQUFNLEVBQU8sSUFBTSxFQUNqRyxJQUFNLEVBQU8sSUFBTSxFQUFPLElBQU0sRUFBTyxJQUFNLEVBQU8sSUFBTSxFQUFPLElBQU0sRUFBTyxJQUFNLEVBQU8sSUFBTSxFQUNqRyxJQUFNLEVBQU8sSUFBTSxFQUFPLElBQU0sRUFBTyxJQUFNLEVBQU8sSUFBTSxFQUFPLElBQU0sRUFBTyxJQUFNLEVBQU8sSUFBTSxFQUNqRyxJQUFNLEVBQU8sSUFBTSxFQUFPLElBQU0sRUFBTyxJQUFNLEVBQU8sSUFBTSxFQUFPLElBQU0sRUFBTyxJQUFNLEVBQU8sSUFBTSxFQUNqRyxJQUFNLEVBQU8sSUFBTSxFQUFPLElBQU0sRUFBTyxJQUFNLEVBQU8sSUFBTSxFQUFPLElBQU0sRUFBTyxJQUFNLEVBQU8sSUFBTSxFQUNqRyxJQUFNLEVBQU8sSUFBTSxFQUFPLElBQU0sRUFBTyxJQUFNLEVBQU8sSUFBTSxFQUFPLElBQU0sRUFBTyxJQUFNLEVBQU8sSUFBTSxFQUNqRyxJQUFNLEVBQU8sSUFBTSxFQUFPLElBQU0sRUFBTyxJQUFNLEVBQU8sSUFBTSxFQUFPLElBQU0sRUFBTyxJQUFNLEVBQU8sSUFBTSxFQUNqRyxJQUFNLEVBQU8sSUFBTSxFQUFPLElBQU0sRUFBTyxJQUFNLEVBQU8sSUFBTSxFQUFPLElBQU0sRUFBTyxJQUFNLEVBQU8sSUFBTSxHQUdqR0MsRUFBYyxHQUVsQixNQWlCTUMsRUFBYSxJQUFJSixLQUNuQixNQUFNSyxFQ3BDUCxZQUFpQkwsR0FFcEIsSUFBSU0sRUFBYU4sRUFFakIsTUFRTU8sRUFSYyxDQUNoQixFQUFJLE1BQ0osRUFBSSxZQUNKLEVBQUksVUFDSixFQUFJLGFBQ0osRUFBSSxXQUdzQkQsRUFBV0UsUUE4QnpDLE1BQU8sQ0FDSEMsWUE3QmdCLElBQ1RGLEVBNkJQRyxhQXpCaUIsSUFDVkosRUF5QlBLLGNBUGtCLElBQ1csSUFBdEJMLEVBQVdFLE9BT2xCSSxnQkFqQnFCQyxJQUVyQixNQUFNQyxFQVBXLENBQUNELEdBQ1hQLEVBQVdTLFFBQVFGLEdBTVBHLENBQWFILEdBQ2hDUCxFQUFhQSxFQUFXVyxRQUFPQyxHQUNwQlosRUFBV1MsUUFBUUcsS0FBV0osTURHM0JLLElBQVFuQixHQUd0QixPQUZBRyxFQUFjaUIsRUFBb0JmLEdBQ2xDZ0IsRUFBeUJoQixHQUNsQkEsR0F3QkxnQixFQUE0QmhCLElBQzlCLE1BQU1pQixFQUFjakIsRUFBS0ssZUFDekIsSUFBSWEsRUFBZ0IsRUFDcEIsSUFBSSxNQUFPQyxLQUFRQyxPQUFPQyxRQUFReEIsR0FDM0JzQixJQUFRRixFQUFZQyxLQUNuQnJCLEVBQVdzQixJQUFPLEVBQ2xCRCxNQUtOSCxFQUF1QmYsR0FDbEIsSUFBSUYsRUFBWUUsR0FHckJzQixFQUFtQ2QsR0FDOUJZLE9BQU9HLE9BQU8sSUFBSTFCLEdBQWEsQ0FBQyxDQUFDLEdBQUdXLEtBQVcsUUFHcERnQixFQUE0QnhCLElBQzlCLE1BQU15QixFQUFZQyxFQUFvQjFCLEdBQ3RDLE9BQU9GLEVBQVljLFFBQU9lLEdBQ2Y3QixFQUFZWSxRQUFRaUIsS0FBZUYsS0FXNUNDLEVBQXVCMUIsR0FDbEJGLEVBQVk4QixXQUFVQyxHQUNsQkEsRUFBWXpCLGdCQUFrQkosRUFBS0ksZ0JBNkJsRCxNQUFPLENBQ0gwQixhQTlHaUIsSUFDVmpDLEVBOEdQa0MsY0EzR2tCLElBQ1hqQyxFQTJHUEMsV0FBQUEsRUFDQWlDLGtCQXpHdUJyQyxJQUN2QixJQUFJc0MsRUFBUSxFQUNaLEtBQU9BLEVBQVF0QyxFQUFZUSxRQUN2QkosS0FBY0osRUFBWXNDLElBQzFCQSxLQXNHSkMsd0JBekY0QixDQUFDQyxFQUFnQixRQUM3QyxNQUFNM0IsRUFBUzJCLEVBRWYsSUFvRWMsQ0FBQzNCLElBQ2YsSUFBSSxNQUFPVyxLQUFRQyxPQUFPQyxRQUFReEIsR0FDOUIsR0FBR3NCLElBQVFYLEdBQVVYLEVBQVdzQixHQUM1QixPQUFPLEVBR2YsT0FBTyxHQTFFSmlCLENBQVU1QixHQVFiLE9BQU9BLEVBUlAsQ0FDSSxNQUFNUixFQTBDVyxDQUFDUSxHQUVmVixFQUFZdUMsTUFBS3JDLEdBQ2JBLEVBQUtLLGVBQWVpQyxTQUFTOUIsS0E3Q3ZCK0IsQ0FBaUIvQixHQUM5QlIsRUFBS00sZ0JBQ0NSLEVBQWMwQixFQUF5QnhCLEdBQ3ZDSCxFQU9XLEVBQUNXLEVBQU9SLEtBQzdCQSxFQUFLTyxnQkFBZ0JDLEdBQ2RjLEVBQWdDZCxJQVRmZ0MsQ0FBaUJoQyxFQUFPUixLQW1GaER3Qix5QkFBQUEsRUFDQWlCLGVBWG1CLElBQ1csSUFBdkIzQyxFQUFZSyxRRGxIRHVDLEdBRWxCLE9BREE5QyxFQUFVb0Msa0JBQWtCckMsR0FDckJDLEdBNkJQK0MsdUJBMUIyQixDQUFDbkMsRUFBUyxPQUc5QkEsRUF3QlBvQyw2QkFyQmtDaEQsSUFHbEMsTUFBTWlELEVBQ0Z6QixPQUFPMEIsS0FBS2xELEVBQVVrQyxnQkFBZ0IzQixPQUNwQzhCLEdBSW9CYyxFQUpTLEVBSUxDLEVBSk9ILEVBSzlCSSxLQUFLQyxNQUFNRCxLQUFLRSxVQUFZSixFQUFNQyxJQUFRQSxHQUR4QixJQUFDRCxFQUFJQyxFQUg5QixPQUFPNUIsT0FBTzBCLEtBQUtsRCxFQUFVa0MsZ0JBQWdCRyxJQWdCN0NtQixpQkFUc0J4RCxHQUNmQSxFQUFVNkMsbUJHbENsQixXQUVILE1Bb0NNWSxFQUFnQixDQUFDQyxFQUFRQyxFQUFRQyxJQUM1QkEsSUFBaUJELEVBQVVELEVBQVVDLEVBRzFDRSxFQUFtQixDQUFDQyxFQUFXQyxFQUFXQyxJQUNyQ0EsSUFBbUJELEVBQWFELEVBQWFDLEVBR3hELE1BQU0sQ0FBQ0UsVUE1Q1csS0FFZCxNQUFNUCxFQUFVaEUsRUFBTyxVQUNqQmlFLEVBQVVqRSxFQUFPLFFBRWpCb0UsRUFBYUosRUFBUTVELGdCQUN2QixDQUFDLE1BQ0QsQ0FBQyxLQUFLLE1BQ04sQ0FBQyxLQUFLLEtBQUssTUFDWCxDQUFDLEtBQUssS0FBSyxLQUFLLE1BQ2hCLENBQUMsS0FBSyxLQUFLLEtBQUssS0FBSyxPQUduQmlFLEVBQWFKLEVBQVE3RCxnQkFDdkIsQ0FBQyxNQUNELENBQUMsS0FBSyxNQUNOLENBQUMsS0FBSyxLQUFLLE1BQ1gsQ0FBQyxLQUFLLEtBQUssS0FBSyxNQUNoQixDQUFDLEtBQUssS0FBSyxLQUFLLEtBQUssT0FHekIsSUFBSThELEVBQWVGLEVBQ2ZNLEVBQWlCRCxFQUVyQixNQUFPTCxFQUFRRixpQkFBaUJNLEtBQWNILEVBQVFILGlCQUFpQk8sSUFDdkUsQ0FDSSxNQUFNRyxFQUFTTixFQUFhYix1QkFBdUIsTUFDbkRpQixFQUFlMUIsd0JBQXdCNEIsR0FDdkNGLEVBQWVuQixpQkFDZmUsRUFBZUgsRUFBY0MsRUFBUUMsR0FDckNRLFFBQVFDLElBQUlSLEdBQ1pJLEVBQWlCSCxFQUFpQkMsRUFBV0MsR0FDN0NJLFFBQVFDLElBQUlKLE9DakNYSyxHQUNSSixhIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vanMtdG9wLWJhdHRsZXNoaXAvLi9zcmMvbG9naWMvcGxheWVyLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vc3JjL2xvZ2ljL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9sb2dpYy9zaGlwLmpzIiwid2VicGFjazovL2pzLXRvcC1iYXR0bGVzaGlwLy4vZ2FtZS5qcyIsIndlYnBhY2s6Ly9qcy10b3AtYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tICcuL2dhbWVib2FyZCdcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBQbGF5ZXIobmFtZSl7XHJcbiAgICBjb25zdCBfcGxheWVyTmFtZSA9IG5hbWVcclxuXHJcbiAgICBjb25zdCBnZXROYW1lID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9wbGF5ZXJOYW1lXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY3JlYXRlR2FtZUJvYXJkID0gKC4uLmNvb3JkaW5hdGVzKSA9PntcclxuICAgICAgICBjb25zdCBnYW1lYm9hcmQgPSBHYW1lYm9hcmQoKVxyXG4gICAgICAgIGdhbWVib2FyZC5wb3B1bGF0ZUdhbWVib2FyZChjb29yZGluYXRlcylcclxuICAgICAgICByZXR1cm4gZ2FtZWJvYXJkXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VuZEF0dGFja0Nvb3Jkc1RvR2FtZSA9IChjb29yZHMgPSAnQTEnKSA9PntcclxuICAgICAgICAvLyBSZWNlaXZlcyBjb29yZHMgZnJvbSBhbiBldmVudCBsaXN0ZW5lclxyXG4gICAgICAgIC8vIGFuZCBzZW5kIGl0IHRvIGdhbWUgXHJcbiAgICAgICAgcmV0dXJuIGNvb3Jkc1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNlbmRSYW5kb21BdHRhY2tDb29yZHNUb0dhbWUgPSAoZ2FtZWJvYXJkKSA9PntcclxuICAgICAgICAvLyBTZWxlY3QgYSByYW5kb20gc3F1YXJlIGZyb20gX2JvYXJkR3JpZFxyXG4gICAgICAgIC8vIGFuZCBzZW5kIGl0IHRvIHRoZSBlbmVteSBnYW1lYm9hcmQucmVjZWl2ZUF0dGFja0Zyb21QbGF5ZXJcclxuICAgICAgICBjb25zdCBCT0FSRF9HUklEX0xFTkdUSCAgPSBcclxuICAgICAgICAgICAgT2JqZWN0LmtleXMoZ2FtZWJvYXJkLmdldEJvYXJkR3JpZCgpKS5sZW5ndGhcclxuICAgICAgICBjb25zdCBpbmRleCA9IGdlbmVyYXRlUmFuZG9tTnVtYmVyKDAsQk9BUkRfR1JJRF9MRU5HVEgpXHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGdhbWVib2FyZC5nZXRCb2FyZEdyaWQoKSlbaW5kZXhdXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZ2VuZXJhdGVSYW5kb21OdW1iZXIgPSAobWF4LG1pbikgPT57XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGlzUGxheWVyRGVmZWF0ZWQgPSAoZ2FtZWJvYXJkKSA9PntcclxuICAgICAgICByZXR1cm4gZ2FtZWJvYXJkLmlzQWxsU2hpcHNTdW5rKClcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm57XHJcbiAgICAgICAgZ2V0TmFtZSxcclxuICAgICAgICBjcmVhdGVHYW1lQm9hcmQsXHJcbiAgICAgICAgc2VuZEF0dGFja0Nvb3Jkc1RvR2FtZSxcclxuICAgICAgICBzZW5kUmFuZG9tQXR0YWNrQ29vcmRzVG9HYW1lLFxyXG4gICAgICAgIGlzUGxheWVyRGVmZWF0ZWRcclxuICAgIH1cclxufVxyXG5cclxuLy8gY29uc3QgcDEgPSBQbGF5ZXIoKVxyXG4vLyBjb25zdCBnYiA9IHAxLmNyZWF0ZUdhbWVCb2FyZChbJ0ExJywnQTInXSlcclxuLy8gY29uc29sZS5sb2cocDEuc2VuZFJhbmRvbUF0dGFja0Nvb3Jkc1RvR2FtZWJvYXJkKGdiKSkiLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwJ1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEdhbWVib2FyZCgpe1xyXG4gICBcclxuICAgIGxldCBfYm9hcmRHcmlkID0gXHJcbiAgICB7XHJcbiAgICAgICAgJ0ExJzogZmFsc2UsICdBMic6IGZhbHNlLCAnQTMnOiBmYWxzZSwgJ0E0JzogZmFsc2UsICdBNSc6IGZhbHNlLCAnQTYnOiBmYWxzZSwgJ0E3JzogZmFsc2UsICdBOCc6IGZhbHNlLCBcclxuICAgICAgICAnQjEnOiBmYWxzZSwgJ0IyJzogZmFsc2UsICdCMyc6IGZhbHNlLCAnQjQnOiBmYWxzZSwgJ0I1JzogZmFsc2UsICdCNic6IGZhbHNlLCAnQjcnOiBmYWxzZSwgJ0I4JzogZmFsc2UsIFxyXG4gICAgICAgICdDMSc6IGZhbHNlLCAnQzInOiBmYWxzZSwgJ0MzJzogZmFsc2UsICdDNCc6IGZhbHNlLCAnQzUnOiBmYWxzZSwgJ0M2JzogZmFsc2UsICdDNyc6IGZhbHNlLCAnQzgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0QxJzogZmFsc2UsICdEMic6IGZhbHNlLCAnRDMnOiBmYWxzZSwgJ0Q0JzogZmFsc2UsICdENSc6IGZhbHNlLCAnRDYnOiBmYWxzZSwgJ0Q3JzogZmFsc2UsICdEOCc6IGZhbHNlLCBcclxuICAgICAgICAnRTEnOiBmYWxzZSwgJ0UyJzogZmFsc2UsICdFMyc6IGZhbHNlLCAnRTQnOiBmYWxzZSwgJ0U1JzogZmFsc2UsICdFNic6IGZhbHNlLCAnRTcnOiBmYWxzZSwgJ0U4JzogZmFsc2UsIFxyXG4gICAgICAgICdGMSc6IGZhbHNlLCAnRjInOiBmYWxzZSwgJ0YzJzogZmFsc2UsICdGNCc6IGZhbHNlLCAnRjUnOiBmYWxzZSwgJ0Y2JzogZmFsc2UsICdGNyc6IGZhbHNlLCAnRjgnOiBmYWxzZSwgXHJcbiAgICAgICAgJ0cxJzogZmFsc2UsICdHMic6IGZhbHNlLCAnRzMnOiBmYWxzZSwgJ0c0JzogZmFsc2UsICdHNSc6IGZhbHNlLCAnRzYnOiBmYWxzZSwgJ0c3JzogZmFsc2UsICdHOCc6IGZhbHNlLCBcclxuICAgICAgICAnSDEnOiBmYWxzZSwgJ0gyJzogZmFsc2UsICdIMyc6IGZhbHNlLCAnSDQnOiBmYWxzZSwgJ0g1JzogZmFsc2UsICdINic6IGZhbHNlLCAnSDcnOiBmYWxzZSwgJ0g4JzogZmFsc2UgXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IF9ib2FyZFNoaXBzID0gW11cclxuICAgIFxyXG4gICAgY29uc3QgZ2V0Qm9hcmRHcmlkID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9ib2FyZEdyaWRcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBnZXRCb2FyZFNoaXBzID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9ib2FyZFNoaXBzXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IHBvcHVsYXRlR2FtZWJvYXJkID0gKGNvb3JkaW5hdGVzKSA9PntcclxuICAgICAgICBsZXQgaW5kZXggPSAwXHJcbiAgICAgICAgd2hpbGUoIGluZGV4IDwgY29vcmRpbmF0ZXMubGVuZ3RoICl7XHJcbiAgICAgICAgICAgIGNyZWF0ZVNoaXAoLi4uY29vcmRpbmF0ZXNbaW5kZXhdKVxyXG4gICAgICAgICAgICBpbmRleCsrXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEluY29taW5nLXF1ZXJ5IChhc3NlcnQgcmVzdWx0KSBYXHJcbiAgICBjb25zdCBjcmVhdGVTaGlwID0gKC4uLmNvb3JkaW5hdGVzKSA9PntcclxuICAgICAgICBjb25zdCBzaGlwICA9IFNoaXAoLi4uY29vcmRpbmF0ZXMpIFxyXG4gICAgICAgIF9ib2FyZFNoaXBzID0gYWRkU2hpcFRvU2hpcHNBcnJheShzaGlwKVxyXG4gICAgICAgIGFkZFNoaXBUb0JvYXJkR3JpZE9iamVjdChzaGlwKVxyXG4gICAgICAgIHJldHVybiBzaGlwXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIEluY29taW5nLXF1ZXJ5IChhc3NlcnQgcmVzdWx0KVxyXG4gICAgY29uc3QgcmVjZWl2ZUF0dGFja0Zyb21QbGF5ZXIgPSAoc2VuZENvb3Jkc0RPTSA9ICdBMScpPT57XHJcbiAgICAgICAgY29uc3QgY29vcmRzID0gc2VuZENvb3Jkc0RPTSAvLyBXaWxsIGJlIGEgbWV0aG9kIGxhdGVyXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoaXNTaGlwSGl0KGNvb3Jkcykpe1xyXG4gICAgICAgICAgICBjb25zdCBzaGlwID0gZmluZFNoaXBCeUNvb3Jkcyhjb29yZHMpXHJcbiAgICAgICAgICAgIHNoaXAuaXNTdW5rTmV4dEhpdCgpIFxyXG4gICAgICAgICAgICAgICAgPyBfYm9hcmRTaGlwcyA9IHJlbW92ZVNoaXBGcm9tU2hpcHNBcnJheShzaGlwKSBcclxuICAgICAgICAgICAgICAgIDogX2JvYXJkR3JpZCAgPSByZW1vdmVTaGlwU3F1YXJlKGNvb3JkcyxzaGlwKVxyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU2VuZCByZW5kZXIgaW5mbyB0byB0aGUgRE9NIG9yIHVzZSBhbm90aGVyIGZ1bmN0aW9uP1xyXG4gICAgICAgIHJldHVybiBjb29yZHNcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW1vdmVTaGlwU3F1YXJlID0gKGNvb3JkcyxzaGlwKSA9PntcclxuICAgICAgICBzaGlwLnJlbW92ZVNxdWFyZUhpdChjb29yZHMpXHJcbiAgICAgICAgcmV0dXJuIHJlbW92ZVNxdWFyZUZyb21Cb2FyZEdyaWRPYmplY3QoY29vcmRzKVxyXG4gICAgfVxyXG4gXHJcbiAgICAvLyBRdWVyeSAmIENvbW1hbmQgc2VsZiB4XHJcbiAgICBjb25zdCBhZGRTaGlwVG9Cb2FyZEdyaWRPYmplY3QgPSAoc2hpcCkgPT57XHJcbiAgICAgICAgY29uc3QgY29vcmRzQXJyYXkgPSBzaGlwLmdldFNoaXBDb29yZCgpXHJcbiAgICAgICAgbGV0IGluZGV4QXJyYXkgICAgPSAwXHJcbiAgICAgICAgZm9yKGNvbnN0IFtrZXldIG9mIE9iamVjdC5lbnRyaWVzKF9ib2FyZEdyaWQpKXtcclxuICAgICAgICAgICAgaWYoa2V5ID09PSBjb29yZHNBcnJheVtpbmRleEFycmF5XSl7XHJcbiAgICAgICAgICAgICAgICBfYm9hcmRHcmlkW2tleV0gPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBpbmRleEFycmF5KytcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWRkU2hpcFRvU2hpcHNBcnJheSA9IChzaGlwKSA9PntcclxuICAgICAgICByZXR1cm4gWy4uLl9ib2FyZFNoaXBzLHNoaXBdXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVtb3ZlU3F1YXJlRnJvbUJvYXJkR3JpZE9iamVjdCA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHsuLi5fYm9hcmRHcmlkfSwge1tgJHtjb29yZHN9YF06ICdIaXQnfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW1vdmVTaGlwRnJvbVNoaXBzQXJyYXkgPSAoc2hpcCkgPT57XHJcbiAgICAgICAgY29uc3Qgc2hpcEluZGV4ID0gZmluZFNoaXBJbmRleEJ5TmFtZShzaGlwKVxyXG4gICAgICAgIHJldHVybiBfYm9hcmRTaGlwcy5maWx0ZXIoYXJyYXlTaGlwID0+e1xyXG4gICAgICAgICAgICByZXR1cm4gX2JvYXJkU2hpcHMuaW5kZXhPZihhcnJheVNoaXApICE9PSBzaGlwSW5kZXggXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuIFxyXG4gICAgY29uc3QgZmluZFNoaXBCeUNvb3JkcyA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIC8vIGZvciBub3cgd2UgcGFzcyBhbiBhcnJheSB3aXRoIGFscmVhZHkgaW5zZXJ0ZWQgdmFsdWVzXHJcbiAgICAgICAgcmV0dXJuIF9ib2FyZFNoaXBzLmZpbmQoc2hpcCA9PntcclxuICAgICAgICAgICAgcmV0dXJuIHNoaXAuZ2V0U2hpcENvb3JkKCkuaW5jbHVkZXMoY29vcmRzKSAgICBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZpbmRTaGlwSW5kZXhCeU5hbWUgPSAoc2hpcCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9ib2FyZFNoaXBzLmZpbmRJbmRleChjdXJyZW50U2hpcCA9PntcclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRTaGlwLmdldFNoaXBOYW1lKCkgPT09IHNoaXAuZ2V0U2hpcE5hbWUoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8gLy8gT3V0Z29pbmctcXVlcnkgeFxyXG4gICAgLy8gY29uc3Qgc2VuZFNoaXBDb29yZCA9ICgpID0+eyBcclxuICAgIC8vICAgICAvLyBHZXRzIGEgU2hpcCBvYmplY3QgYW5kIHNlbmRzXHJcbiAgICAvLyAgICAgLy8gaXQncyBjb29yZGluYXRlcyB0byBWaWV3XHJcbiAgICAvLyB9XHJcbiAgICBcclxuICAgIC8vIC8vIE91dGdvaW5nIHF1ZXJ5IHhcclxuICAgIC8vIGNvbnN0IHNlbmRIaXRDb29yZCA9ICgpID0+e1xyXG4gICAgLy8gICAgIC8vIFNlbmQgaGl0IGNvb3JkaW5hdGVzIHRvIHRoZSBoaXRcclxuICAgIC8vICAgICAvLyBzaGlwXHJcbiAgICAvLyB9XHJcblxyXG4gICAgY29uc3QgaXNTaGlwSGl0ID0gKGNvb3JkcykgPT57XHJcbiAgICAgICAgZm9yKGNvbnN0IFtrZXldIG9mIE9iamVjdC5lbnRyaWVzKF9ib2FyZEdyaWQpKXtcclxuICAgICAgICAgICAgaWYoa2V5ID09PSBjb29yZHMgJiYgX2JvYXJkR3JpZFtrZXldKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaXNBbGxTaGlwc1N1bmsgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX2JvYXJkU2hpcHMubGVuZ3RoID09PSAwID8gdHJ1ZSA6IGZhbHNlXHJcbiAgICB9XHJcbiAgXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldEJvYXJkR3JpZCxcclxuICAgICAgICBnZXRCb2FyZFNoaXBzLFxyXG4gICAgICAgIGNyZWF0ZVNoaXAsXHJcbiAgICAgICAgcG9wdWxhdGVHYW1lYm9hcmQsXHJcbiAgICAgICAgcmVjZWl2ZUF0dGFja0Zyb21QbGF5ZXIsXHJcbiAgICAgICAgcmVtb3ZlU2hpcEZyb21TaGlwc0FycmF5LFxyXG4gICAgICAgIGlzQWxsU2hpcHNTdW5rLFxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJleHBvcnQgZnVuY3Rpb24gU2hpcCguLi5jb29yZGluYXRlcyl7XHJcblxyXG4gICAgbGV0IF9zaGlwQ29vcmQgPSBjb29yZGluYXRlc1xyXG5cclxuICAgIGNvbnN0IF9TSElQX05BTUVTID0ge1xyXG4gICAgICAgIDEgOiAnU3B5JyxcclxuICAgICAgICAyIDogJ0Rlc3Ryb3llcicsXHJcbiAgICAgICAgMyA6ICdDcnVpc2VyJyxcclxuICAgICAgICA0IDogJ0JhdHRsZXNoaXAnLFxyXG4gICAgICAgIDUgOiAnQ2FycmllcidcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBfc2hpcE5hbWUgPSBfU0hJUF9OQU1FU1tfc2hpcENvb3JkLmxlbmd0aF1cclxuICAgIFxyXG4gICAgY29uc3QgZ2V0U2hpcE5hbWUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX3NoaXBOYW1lXHJcbiAgICB9XHJcblxyXG4gICAgLy8gT3V0Z29pbmcgcXVlcnkgeFxyXG4gICAgY29uc3QgZ2V0U2hpcENvb3JkID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIF9zaGlwQ29vcmRcclxuICAgIH1cclxuXHJcbiAgICAvLyBJbmNvbWluZyBxdWVyeSAoYXNzZXJ0IHJlc3VsdClcclxuICAgIGNvbnN0IGZpbmRIaXRJbmRleCA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIHJldHVybiBfc2hpcENvb3JkLmluZGV4T2YoY29vcmRzKSAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gU2VsZiBjb21tYW5kIHhcclxuICAgIGNvbnN0IHJlbW92ZVNxdWFyZUhpdCA9IChjb29yZHMpID0+e1xyXG4gICAgICAgIC8vIFVzZSBmaWx0ZXIgYW5kIHJldHVybiBhIG5ldyBhcnJheT9cclxuICAgICAgICBjb25zdCBpbmRleENvb3JkID0gZmluZEhpdEluZGV4KGNvb3JkcylcclxuICAgICAgICBfc2hpcENvb3JkID0gX3NoaXBDb29yZC5maWx0ZXIoY29vcmQgPT57XHJcbiAgICAgICAgICAgIHJldHVybiBfc2hpcENvb3JkLmluZGV4T2YoY29vcmQpICE9PSBpbmRleENvb3JkIFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8gUHVyZSAvIE91dGdvaW5nIHF1ZXJ5IHhcclxuICAgIGNvbnN0IGlzU3Vua05leHRIaXQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gX3NoaXBDb29yZC5sZW5ndGggPT09IDEgPyB0cnVlIDogZmFsc2VcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRTaGlwTmFtZSxcclxuICAgICAgICBnZXRTaGlwQ29vcmQsXHJcbiAgICAgICAgaXNTdW5rTmV4dEhpdCxcclxuICAgICAgICByZW1vdmVTcXVhcmVIaXRcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBQbGF5ZXIgfSBmcm9tICcuL3NyYy9sb2dpYy9wbGF5ZXInXHJcbmV4cG9ydCBmdW5jdGlvbiBHYW1lICgpe1xyXG5cclxuICAgIGNvbnN0IHNldHVwR2FtZSA9ICgpID0+e1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHBsYXllcjEgPSBQbGF5ZXIoJ1ZpY3RvcicpXHJcbiAgICAgICAgY29uc3QgcGxheWVyMiA9IFBsYXllcignT2xnYScpXHJcblxyXG4gICAgICAgIGNvbnN0IGdhbWVib2FyZDEgPSBwbGF5ZXIxLmNyZWF0ZUdhbWVCb2FyZChcclxuICAgICAgICAgICAgWydBMSddLFxyXG4gICAgICAgICAgICBbJ0IxJywnQjInXSxcclxuICAgICAgICAgICAgWydDMScsJ0MyJywnQzMnXSxcclxuICAgICAgICAgICAgWydEMScsJ0QyJywnRDMnLCdENCddLFxyXG4gICAgICAgICAgICBbJ0UxJywnRTInLCdFMycsJ0U0JywnRTUnXVxyXG4gICAgICAgIClcclxuXHJcbiAgICAgICAgY29uc3QgZ2FtZWJvYXJkMiA9IHBsYXllcjIuY3JlYXRlR2FtZUJvYXJkKCAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBbJ0ExJ10sXHJcbiAgICAgICAgICAgIFsnQjEnLCdCMiddLFxyXG4gICAgICAgICAgICBbJ0MxJywnQzInLCdDMyddLFxyXG4gICAgICAgICAgICBbJ0QxJywnRDInLCdEMycsJ0Q0J10sXHJcbiAgICAgICAgICAgIFsnRTEnLCdFMicsJ0UzJywnRTQnLCdFNSddXHJcbiAgICAgICAgKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICBsZXQgcGxheWVySW5UdXJuID0gcGxheWVyMVxyXG4gICAgICAgIGxldCBlbmVteUdhbWVib2FyZCA9IGdhbWVib2FyZDJcclxuXHJcbiAgICAgICAgd2hpbGUoIXBsYXllcjEuaXNQbGF5ZXJEZWZlYXRlZChnYW1lYm9hcmQxKXx8IXBsYXllcjIuaXNQbGF5ZXJEZWZlYXRlZChnYW1lYm9hcmQyKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IGF0dGFjayA9IHBsYXllckluVHVybi5zZW5kQXR0YWNrQ29vcmRzVG9HYW1lKCdBMScpXHJcbiAgICAgICAgICAgIGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2tGcm9tUGxheWVyKGF0dGFjaylcclxuICAgICAgICAgICAgZW5lbXlHYW1lYm9hcmQuaXNBbGxTaGlwc1N1bmsoKVxyXG4gICAgICAgICAgICBwbGF5ZXJJblR1cm4gPSBzd2l0Y2hQbGF5ZXJzKHBsYXllcjEscGxheWVyMilcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocGxheWVySW5UdXJuKVxyXG4gICAgICAgICAgICBlbmVteUdhbWVib2FyZCA9IHN3aXRjaEdhbWVib2FyZHMoZ2FtZWJvYXJkMSxnYW1lYm9hcmQyKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlbmVteUdhbWVib2FyZClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3dpdGNoUGxheWVycyA9IChwbGF5ZXIxLHBsYXllcjIscGxheWVySW5UdXJuKSA9PntcclxuICAgICAgICByZXR1cm4gcGxheWVySW5UdXJuID09PSBwbGF5ZXIyID8gcGxheWVyMSA6IHBsYXllcjJcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzd2l0Y2hHYW1lYm9hcmRzID0gKGdhbWVib2FyZDEsZ2FtZWJvYXJkMixlbmVteUdhbWVib2FyZCkgPT57XHJcbiAgICAgICAgcmV0dXJuIGVuZW15R2FtZWJvYXJkID09PSBnYW1lYm9hcmQyID8gZ2FtZWJvYXJkMSA6IGdhbWVib2FyZDJcclxuICAgIH0gICBcclxuXHJcbiAgICByZXR1cm57c2V0dXBHYW1lfVxyXG59IiwiaW1wb3J0IHsgR2FtZSB9IGZyb20gJy4uL2dhbWUnXHJcblxyXG5jb25zdCBnYW1lID0gR2FtZSgpXHJcbmdhbWUuc2V0dXBHYW1lKCkiXSwibmFtZXMiOlsiUGxheWVyIiwibmFtZSIsIl9wbGF5ZXJOYW1lIiwiZ2V0TmFtZSIsImNyZWF0ZUdhbWVCb2FyZCIsImNvb3JkaW5hdGVzIiwiZ2FtZWJvYXJkIiwiX2JvYXJkR3JpZCIsIl9ib2FyZFNoaXBzIiwiY3JlYXRlU2hpcCIsInNoaXAiLCJfc2hpcENvb3JkIiwiX3NoaXBOYW1lIiwibGVuZ3RoIiwiZ2V0U2hpcE5hbWUiLCJnZXRTaGlwQ29vcmQiLCJpc1N1bmtOZXh0SGl0IiwicmVtb3ZlU3F1YXJlSGl0IiwiY29vcmRzIiwiaW5kZXhDb29yZCIsImluZGV4T2YiLCJmaW5kSGl0SW5kZXgiLCJmaWx0ZXIiLCJjb29yZCIsIlNoaXAiLCJhZGRTaGlwVG9TaGlwc0FycmF5IiwiYWRkU2hpcFRvQm9hcmRHcmlkT2JqZWN0IiwiY29vcmRzQXJyYXkiLCJpbmRleEFycmF5Iiwia2V5IiwiT2JqZWN0IiwiZW50cmllcyIsInJlbW92ZVNxdWFyZUZyb21Cb2FyZEdyaWRPYmplY3QiLCJhc3NpZ24iLCJyZW1vdmVTaGlwRnJvbVNoaXBzQXJyYXkiLCJzaGlwSW5kZXgiLCJmaW5kU2hpcEluZGV4QnlOYW1lIiwiYXJyYXlTaGlwIiwiZmluZEluZGV4IiwiY3VycmVudFNoaXAiLCJnZXRCb2FyZEdyaWQiLCJnZXRCb2FyZFNoaXBzIiwicG9wdWxhdGVHYW1lYm9hcmQiLCJpbmRleCIsInJlY2VpdmVBdHRhY2tGcm9tUGxheWVyIiwic2VuZENvb3Jkc0RPTSIsImlzU2hpcEhpdCIsImZpbmQiLCJpbmNsdWRlcyIsImZpbmRTaGlwQnlDb29yZHMiLCJyZW1vdmVTaGlwU3F1YXJlIiwiaXNBbGxTaGlwc1N1bmsiLCJHYW1lYm9hcmQiLCJzZW5kQXR0YWNrQ29vcmRzVG9HYW1lIiwic2VuZFJhbmRvbUF0dGFja0Nvb3Jkc1RvR2FtZSIsIkJPQVJEX0dSSURfTEVOR1RIIiwia2V5cyIsIm1heCIsIm1pbiIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImlzUGxheWVyRGVmZWF0ZWQiLCJzd2l0Y2hQbGF5ZXJzIiwicGxheWVyMSIsInBsYXllcjIiLCJwbGF5ZXJJblR1cm4iLCJzd2l0Y2hHYW1lYm9hcmRzIiwiZ2FtZWJvYXJkMSIsImdhbWVib2FyZDIiLCJlbmVteUdhbWVib2FyZCIsInNldHVwR2FtZSIsImF0dGFjayIsImNvbnNvbGUiLCJsb2ciLCJHYW1lIl0sInNvdXJjZVJvb3QiOiIifQ==