function colisao(objeto1, objeto2) {
    var colidiu = false
    var indice = 0

    var pontos_obj1 = [
        {x: objeto1.x, y: objeto1.y},
        {x: objeto1.x + objeto1.width, y: objeto1.y},
        {x: objeto1.x, y: objeto1.y + objeto1.height},
        {x: objeto1.x + objeto1.width, y: objeto1.y + objeto1.height}
    ]

    var pontos_obj2 = [
        {x: objeto2.x, y: objeto2.y},
        {x: objeto2.x + objeto2.width, y: objeto2.y},
        {x: objeto2.x, y: objeto2.y + objeto2.height},
        {x: objeto2.x + objeto2.width, y: objeto2.y + objeto2.height}
    ]

    while ( (colidiu==false) && (indice<4) ) {
        ((pontos_obj1[indice].x >= objeto2.x && pontos_obj1[indice].x <= objeto2.x + objeto2.width && pontos_obj1[indice].y >= objeto2.y && pontos_obj1[indice].y <= objeto2.y + objeto2.height) ||
        (pontos_obj2[indice].x >= objeto1.x && pontos_obj2[indice].x <= objeto1.x + objeto1.width && pontos_obj2[indice].y >= objeto1.y && pontos_obj2[indice].y <= objeto1.y + objeto1.height)) ? colidiu = true: indice++
    }
    
    return colidiu
}