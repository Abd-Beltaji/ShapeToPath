# ShapeToPath.js
## What id does?
- It transforms an svg shape element `(line, rect, circle, ellipse)` into a path or an SVG path element.

## How it works?
- It uses `pre-defined path templates` using the elements `attributes` to generate the appropreate path.
  
## Usage:
---
### **shapeToPath**(*Element*): String

Description
:  It is used to generate a String path from the given shape.`

**Example**:
```js
import { shapeToPath } from "ShapeToPath"

const rect = document.querySelector("rect")
let rectPath = shapeToPath(rect)
console.log(rectPath)
```
---
### **shapeToPathElement**(*Element*): SVGPathElement

Description
:  It is used to generate an SVG path Element from the given shape that has the same attributes and has the new generated SVG path.`

**Example**:
```js
import { shapeToPathElement } from "ShapeToPath"

const rectShapeElement = document.querySelector("rect")
let rectPathElement = shapeToPath(rect)
console.log(rectPathElement)
```

---
### **getPath**(*shape:String*, *attributes:Object* ): String

Description
:  It generates a path without needing to pass an element, it takes the shape type as a String and the required attributes and generates a path.`

**Example**:
```js
import { getPath } from "ShapeToPath"

let path = getPath("rect",{
    x: 5,
    y: 10,
    height: 25,
    width: 35,
    rx: 25
})
console.log(path)
```
