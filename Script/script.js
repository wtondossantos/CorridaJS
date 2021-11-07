function Carro(idDiv) {
    var _batidasSuportadas = 5, _idCarro = 'carro';
    this.suportaBatidas = true;

    var _criar = function () {

        var car = document.createElement('img'), div = document.getElementById(idDiv);
        if (div != null) {
            car.setAttribute('id', 'carro');
            car.setAttribute('src', 'frente.png');
            div.appendChild(car);
        } else {
            alert('A div com id igual a' + idDiv + 'não existe!');
        }
    };

    this.batidasSuportadas = function () {
               
        return _batidasSuportadas;
    };

    this.bateu = function () {
        _batidasSuportadas--;
        if (_batidasSuportadas <= 0) {
            this.suportaBatidas = false;
        }
    };

    this.pegaObj = function () {
        return document.getElementById(_idCarro);
    };

    this.destroi = function () {
        var car = this.pegaObj();

        if (car != null) {
            car.parentNode.removeChild(car);
        }
    };
    this.destroi();
    _criar();
}

function Cenario(idDiv) {
    var _tempoLancamento = 5000, _timerLancamento,
        _tempoAtualizacao = 500, _timerAtualizacao,
        _car = new Carro(idDiv), _pedras = [];

    var _parse = function(obj, prop){
        return parseFloat('0' + obj.style.[prop].replace(/[^\d]/gi, ''));
    };

    var _colidiu = function(x, y, carX, carY, w, h){
        var x30 = x + 30, y30 = y + 30,
            rX = (x >= carX && x <= (carX + carW)),
            rX30 =(x30 >= carX && x30 <= (carX + carW)),
            rY = (y >= carX && y <= (carY + carH)),
            rY30 =(y30 >= carY && y30 <= (carY + carH));

        return (rX && rY) || (rX && rY30) || (rX30 && rY) || (rX30 && rY30);
    };

    var _lancarPedra = function () {
        var pedra = document.createElement('div'), carObj = _car.pegaObj();
        pedra.setAttribute('class', 'pedra');
        pedra.setAttribute('style', 'width:30px;height:30px;');
        carObj.parentNode.appendChild(pedra);
        _pedras.push(pedra);
    }

    var _atualizarPedra = function () {
        var carObj = _car.pegaObj();
        aux = [];
        carX = _parse(carObj, 'left'), carY = _parse(carObj, 'top');
        w = _parse(carObj, 'width'), h = _parse(carObj, 'height');

        for (var i = 0; i < _pedras.length; i++) {
            var pedra = _pedras[i];
            x = _parse(pedra, 'left'), y = _parse(pedra, 'top'), remove = true;

            if (pedra != null && y > 0) {

                if(_colidiu(x, y, carX, carY, w, h)){
                    _car.bateu();

                    if(!_car.suportaBatidas){
                        _car.destroi();
                        remove = true;
                        i = _pedras.length;
                        alert('O seu carro foi destruido!');
                    }
                }else{
                    pedra.style.top = (y - 5) + 'px';
                    aux.push(pedra);
                }
            }else{
                remove = true;
            }
            if(remove){
                carObj.parentNode.removeChild(pedra);
            }
        }
        _pedras = aux;
    };

    this.iniciar = function () {
        _timerLancamento = setInterval(_lancarPedra, _tempoLancamento);
        _timerAtualizacao = setInterval(_atualizarPedra, _tempoAtualizacao);
    };
}

onload = function () {
    var car = new Carro();
    alert(car.batidasSuportadas());
    alert(car.suportaBatidas);
    alert(car.bateu());
    alert(car.bateu());
    alert(car.bateu());
    alert(car.batidasSuportadas());
    alert(car.suportaBatidas);

    var carro = document.getElementById('carro'),
        imgFrente = 'frente.png',
        imgTras = 'tras.png',
        imgUp = 'esquerda.png',
        imgDown = 'direita.png';

    document.onkeydown = function (evento) {
        var e = evento || event,
            key = e.keyCode || e.which,
            left = 37, up = 38, right = 39, down = 40,
            x = parseFloat('0' + carro.style.left.replace(/[^\d]/gi, '')),
            y = parseFloat('0' + carro.style.top.replace(/[^\d]/gi, '')),
            width = 90, height = 50;

        if (carro != null) {
            switch (key) {
                case left:
                    carro.src = imgTras;
                    if (x < 5) {
                        x = 0;
                    } else {
                        x -= 5;
                    }
                    break;
                case right:
                    carro.src = imgFrente;
                    if (x >= 800 - width / 2) {
                        x = 800 - width / 2;
                    } else {
                        x += 5;
                    }
                    break;
                case up:
                    carro.src = imgUp;
                    width = 50;
                    height = 90;
                    if (y < 5) {
                        y = 0;
                    } else {
                        y -= 5;
                    }
                    break;
                case down:
                    carro.src = imgDown;
                    width = 50;
                    height = 90;
                    if (y >= 300 - height / 2) {
                        y = 300 - height / 2;
                    } else {
                        y += 5;
                    }
                    break;
            }
            carro.style.left = x + 'px';
            carro.style.top = y + 'px';
            carro.style.width = width + 'px';
            carro.style.height = height + 'px';
        }
    }
};