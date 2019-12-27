
let cols, rows
let stack = []
let w = 10;
let grid = [];
let curr;
function setup() {
  createCanvas(400, 200);
  frameRate(5)
  cols = floor(width / w);
  rows = floor(height / w);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  curr = grid[0];
  //console.log(  grid[2]  ) 
}
function removeWall(a, b){
  
 let x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  let y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
  
}
function draw() {
  background(51);
 frameRate(30)
  for (let i = 0; i< grid.length; ++i){
 //   console.log(grid[1])
     grid[i].show() 
  }
  curr.visited = true;
  let next = curr.check()
  console.log(next)
  if (next) {
    
    next.visited = true;
    
    stack.push(curr)
    
    curr.highlight()
    removeWall(curr, next)
    
    
    curr = next;
    
  }else if (stack.length> 0){
    curr =  stack.pop()
    curr.highlight()
  }
  
}
function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}
function Cell(i, j){
  
  this.i = i
  this.j = j
  this.visited = false
  this.walls = [true, true, true, true]
  
  
  this.check = function(){

  
    let n = []
   
    let top     = grid[index(i, j - 1)];
    let right  = grid[index(i + 1, j)];
    let bottom = grid[index(i, j + 1)];
    let left   = grid[index(i - 1, j)];
   if(top && !top.visited){
     
    n.push(top) 
   }
   if(right && !right.visited){
     
    n.push(right) 
   }
    if(bottom && !bottom.visited){
     
    n.push(bottom) 
   }
    if(left && !left.visited){
     
    n.push(left) 
   }
    //console.log(n.length)
    //console.log( n.visited )
    if (n.length > 0){
    //  console.log(2222)
     let r = floor(random(0, n.length ))
   // console.log(r)
     return n[r];     
    }else {
      return undefined;
    }
    
  };
  this.highlight = function(){
    let x  =  this.i*w
    let y = this.j*w
    
    noStroke()
    fill(0, 0 , 255, 255)
    rect(x, y, w, w)
    
    
  }
  this.show = function(){
    let x  =  this.i*w
    let y = this.j*w
    stroke(255)
    if (this.walls[0]){
      line(x, y, x+w, y)
    } 
    if (this.walls[1]){
      line(x+w, y, x+w, y+w)
    }
    if (this.walls[2]){
      line(x+w, y+w, x, y+w)
    }
    if (this.walls[3]){
      line(x, y+w, x, y)
    }
    if (this.visited) {
      noStroke();
      fill(255, 0, 255, 100);
      rect(x, y, w, w);
    }

  }
}
  