export const shapeToPathElement = shapeElement => {
  const pathElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
  )
  pathElement.setAttribute('d', shapeToPath(shapeElement))
  for (let attribute of shapeElement.attributes) {
    if (/^(x|y|x1|x2|y1|y2|cx|cy|rx|ry|height|width)$/i.test(attribute.name)) // <= remove shape attributes
      continue
    pathElement.setAttribute(attribute.name, attribute.value)
  }
  return pathElement
}

export const getPath = (shapeType, attributes) => {
  switch (shapeType) {
    case 'rect': {
      let x  = attributes.x       || 0
      let y  = attributes.y       || 0
      let h  = attributes.height  || 0
      let w  = attributes.width   || 0
      let rx = attributes.rx
      let ry = attributes.ry
      
      rx = rx ? rx : ry ? ry : 0 // <= rx defaults as ry if not defined
      ry = ry ? ry : rx ? rx : 0 // <= ry defaults as rx if not defined

      return rx || ry // <= the rectangle is rounded
        ? `M${x + rx} ${y} 
        h${ w - 2 * rx} a${rx},${ry} 0 0 1 ${ rx},${ ry} 
        v${ h - 2 * ry} a${rx},${ry} 0 0 1 ${-rx},${ ry}
        h${-w + 2 * rx} a${rx},${ry} 0 0 1 ${-rx},${-ry}
        v${-h + 2 * ry} a${rx},${ry} 0 0 1 ${ rx},${-ry} Z`
        : `M${x} ${y} l${w} 0 l0 ${h} l${-w} 0 l0 ${-h } Z`
    }
    case 'circle': {
      let cx = attributes.cx || 0
      let cy = attributes.cy || 0
      let r  = attributes.r  || 0

      return `M${cx - r}, ${cy} a${r},${r} 0 1,0 ${r * 2},0 a${r},${r} 0 1,0 ${-r * 2},0 Z`
    }
    case 'line': {
      let x1 = attributes.x1 || 0
      let y1 = attributes.y1 || 0
      let x2 = attributes.x2 || 0
      let y2 = attributes.y2 || 0

      return `M ${x1} ${y1} L${x2} ${y2}`
    }
    case 'ellipse': {
      let cx = attributes.cx || 0
      let cy = attributes.cy || 0
      let rx = attributes.rx ? attributes.rx : attributes.ry // <= rx defaults as ry if not defined
      let ry = attributes.ry ? attributes.ry : attributes.rx // <= ry defaults as rx if not defined
      if (!rx && !rx) {
        throw `Either 'rx' or 'ry' should be passed for an 'ellipse' element!`
      }

      return `M${cx},${cy - ry}
      a${rx},${ry} 0 0 1 ${ rx},${ ry}
      a${rx},${ry} 0 0 1 ${-rx},${ ry}
      a${rx},${ry} 0 0 1 ${-rx},${-ry}
      a${rx},${ry} 0 0 1 ${ rx},${-ry}`
    }
  }
}

export const shapeToPath = element => {
  switch (element.tagName) {
    case 'rect': {
      return getPath(element.tagName, {
        x:      parseInt(element.getAttribute('x'     )),
        y:      parseInt(element.getAttribute('y'     )),
        height: parseInt(element.getAttribute('height')),
        width:  parseInt(element.getAttribute('width' )),
        rx:     parseInt(element.getAttribute('rx'    )),
        ry:     parseInt(element.getAttribute('ry'    ))
      })
    }
    case 'circle': {
      return getPath(element.tagName, {
        cx: parseInt(element.getAttribute('cx')),
        cy: parseInt(element.getAttribute('cy')),
        r:  parseInt(element.getAttribute('r' ))
      })
    }
    case 'line': {
      return getPath(element.tagName, {
        x1: parseInt(element.getAttribute('x1')),
        y1: parseInt(element.getAttribute('y1')),
        x2: parseInt(element.getAttribute('x2')),
        y2: parseInt(element.getAttribute('y2'))
      })
    }
    case 'ellipse': {
      return getPath(element.tagName, {
        cx: parseInt(element.getAttribute('cx')),
        cy: parseInt(element.getAttribute('cy')),
        rx: parseInt(element.getAttribute('rx')) || null,
        ry: parseInt(element.getAttribute('ry')) || null
      })
    }
  }
}