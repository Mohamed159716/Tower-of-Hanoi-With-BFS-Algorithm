// show loading 
window.onload = function() {
    $('.loading-box .loading').delay(2000).fadeOut(500 ,function() {
        $(this).parent().fadeOut(1000, function() {
            $(this).remove();
        });
    });
    
};
var count = 0;


var numberofdisk = 0;
    input_show = $('.input_show');

introFun();
function introFun() {
    // To reset input and button
    input_show.val("");
    $(".input_box button").css({
        bottom: -1000 + "px",
        opacity: '0'
    });    


    input_show.keyup(function() {
    if($(this).val() != "" && !isNaN($(this).val()) && $(this).val() >= 1 && $(this).val() <= 8) {
        $(".input_box button").animate({opacity: 1}).animate({
            bottom: -80 + "px"
        });
    } else {
        $(".input_box button").animate({
            bottom: -1000 + "px"
        }).animate({opacity: 0})
        numberofdisk = $(this).val();
    }
});
$('.disk_number button').click(function() {
    numberofdisk = parseInt(input_show.val());
    $('.disk_number').css('display', 'none');
    $('body').css('transform', 'scale(.6)')
    $('.bar').css('opacity', '1');
    play(numberofdisk);
});
}






var checkwin = numberofdisk;
var colone = [];
var coltwo = [];
var colthree = [];
var TOWER_HEIGHT;
var RODS;
function play(n) {
    var stack = [];
    $('.disk').remove();
    colone = [];
    coltwo = [];
    colthree = [];
TOWER_HEIGHT = n,
RODS = 3;




const pyramid = Array.from({ length: TOWER_HEIGHT }, (a, i) => String.fromCharCode(65 + i))
        letters = pyramid.join(""),
        delimiters = Array.from({ length: RODS - 1 }, () => "-").join(""),
        initialState = `${ letters }${ delimiters }`,
        finalState = `${ delimiters }${ letters }`;

console.log(Array.from({ length: TOWER_HEIGHT }, (a, i) => String.fromCharCode(65 + i)));

console.log(RODS);
console.log(letters);
console.log(pyramid);

var disks = document.getElementById('disks');
var dec = TOWER_HEIGHT;
var valueTop = 503;
for (var i = 0; i < TOWER_HEIGHT; i++) {
    $('.disks').append('<div data-width="' + (50 * dec--) + '" id="disk' + pyramid[i] +'" class="disk disk'+ pyramid[i] + ' disk'+ (TOWER_HEIGHT - (i)) +'" style = "top: '+ (valueTop -= 60) + 'px"><div class="top"></div><div class="middle"></div><div class="bottom"></div></div>');
    colone.push(document.getElementById('disk' + pyramid[i]));
}




function getNextStates(state) {

    const towers = state.split("-"),
          // b. ["ABC", "D", ""]
    topRings = towers.map(s => s[s.length - 1]),
          // b. ["C", "D", undefined]
    variants = [];

    for (let posA = 0; posA < topRings.length; ++posA) {

        if (!topRings[posA]) continue; // skip undefined's as we can't move them
        for (let posB = 0; posB < topRings.length; ++posB) {
            if (!(topRings[posA] <= topRings[posB])) // try posA -> posB
                variants.push(towers.map(function (tower, pos) {
                    return pos === posA ? tower.slice(0, tower.length - 1) // take one from top
                    : pos === posB ? tower + topRings[posA] // place one on top
                    : tower;
                } // don't touch
                ).join("-"));
        }
    }
    return variants;
}

let iter = 0;


function bfs(stack = [{ state: initialState, path: [initialState] }], past = new Set([initialState])) {
    while (true) {
        if (stack.length === 0) return [];
        let currentState = stack.shift(),
            vars = getNextStates(currentState.state).filter(function (s) {
                return !past.has(s) && past.add(s);
            }).map(function (s) {
                return { state: s, path: currentState.path.concat(s) };
            }),
            final = vars.filter(s => s.state === finalState)[0];
        if (++iter % 10000 === 0) process.stdout.write(`\r${ iter } deepening level ${ currentState.path.length }`);
        if (final) return final.path;
        stack.push(...vars);
    }
}





(() => {
    let result;
    console.log(`--- Hanoi Tower Solution ---`);
    console.log(`Tower height: ${ TOWER_HEIGHT }`);
    console.log(`Number of rods: ${ RODS }`);
    console.log(`Solving (BFS algorithm), please wait...`);
    iter = 0;
    result = bfs();
    console.log(`\rDone, number of iterations: ${ iter }.`);
    console.log(result.length ? `First possible solution found (${ result.length } steps): ${ result.join(" => ") }` : `No solutions for this input!`);



    console.log(result);


    var shortResult = [];
    for (var i = 0; i < result.length; i++) {
        shortResult.push(result[i].split("-"));
    }

    for(var i = 1; i < shortResult.length; i++) {

        for( var j = 0; j < shortResult[0].length; j++) {

            if(shortResult[i - 1][j] == shortResult[i][j] && shortResult[i - 1][j] != "" && shortResult[i][j]) {
                continue;
            } else if(shortResult[i - 1][j].startsWith(shortResult[i][j])) {
                if(shortResult[i - 1][j].length-1 == shortResult[i][j].length-1) {
                    continue;
                }
            } else if(shortResult[i - 1][j] != shortResult[i][j]) {
                // moving(shortResult[i][j][shortResult[i][j].length-1], j)
                stack.push({disk: `${shortResult[i][j][shortResult[i][j].length-1]}`, column: j});
            }

        }

    }

})();



var i = 0;

(function timing() {

    if (i != stack.length) {
        var disk = document.getElementById('disk' + stack[i].disk);
        var col1 = 1;
        var col2 = 401;
        var col3 = 800;
        var col;
        disk.classList.add('active');
        var posTop = disk.offsetTop;
        var posLeft = disk.offsetLeft;
        var column = stack[i].column;
        var s;
        space = 0;
        test();
        function test() {
            if (colone.includes(disk)) {
                s = colone.pop();
            } else if(coltwo.includes(disk)) {
                s = coltwo.pop();
            } else if(colthree.includes(disk)) {
                s = colthree.pop();
            }
        }




        if(column == 0) {
            col = col1 
            colone.push(disk);
            space = 60 * colone.length;
        } else if(column == 1) {
            col = col2
            coltwo.push(disk);
            space = 60 * coltwo.length;
        } else {
            col = col3
            colthree.push(disk);
            space = 60 * colthree.length; // the space between disks in columns
        }

        if(disk.clientWidth != 50) {
            col -= ((disk.dataset.width - 50) / 2);
        }

            

        topfun();
        function topfun() {
            var top = setInterval(function() {
            
                if(posTop > 0) {
                    disk.style.top = posTop + "px";
                    posTop--;
                } else {
                    leftfun();
                    clearInterval(top);
                }
            });
        }

        
        function leftfun() {
            var left = setInterval(function() {
            if(posLeft <= col) {
                disk.style.left = posLeft + 'px';
                posLeft++;
            }else if(posLeft > col && posLeft != col + 1) {
                disk.style.left = posLeft - 2 + 'px';
                posLeft--;
            } else {
                downfun();
                clearInterval(left);
            }
            })
        }

        function downfun() {
            var down = setInterval(function() {
                if(posTop < 504 - space) {
                    disk.style.top = posTop + 'px';
                    posTop++;
                } else {
                    disk.classList.remove('active');
                    i++;
                    timing();
                    clearInterval(down);
                }
            })
        }
    } else {
        count = 0;
        checkWin();
    }
})();

}

function checkWin() {
    if (colthree.length == numberofdisk) {
        $('.bar').fadeTo(100, 0);
        $('#cong').fadeTo(1000, 1).css( 'zIndex', 20);
        $('.disks .disk').remove();
        
            var text="Congratulation, The puzzle game is solved",
            cong = document.getElementById('cong');
            var distimer = setInterval(function() {
            if (count >= text.length) {
                clearInterval(distimer);
            } else {
                cong.textContent += text[count];
                count++;
            }
        }, 100);
    }
}