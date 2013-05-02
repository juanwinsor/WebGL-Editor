function cube()
{
    this.verticesBody = new Array();
    this.indicesBody = new Array();
    
    this.verticesBody = [0, 0.5, -12,   0.7, 0.7, 0.7, 1,   1, 1,
                        -2, 0, 0,       0.7, 0.7, 0.7, 1,   1, 1,
                        0, 1, -3,       0.7, 0.7, 0.7, 1,   1, 1,
                        2, 0, 0,        0.7, 0.7, 0.7, 1,   1, 1,
                        0, -1, -1,      0.7, 0.7, 0.7, 1,   1, 1
    ];
    
    
    this.indicesBody[0] = 0;
    this.indicesBody[1] = 1;
    this.indicesBody[2] = 2;
	this.indicesBody[3] = 2;
	this.indicesBody[4] = 3;
	this.indicesBody[5] = 0;
	this.indicesBody[6] = 4;
	this.indicesBody[7] = 1;
	this.indicesBody[8] = 0;
	this.indicesBody[9] = 4;
	this.indicesBody[10] = 0;
	this.indicesBody[11] = 3;
	this.indicesBody[12] = 1;
	this.indicesBody[13] = 4;
	this.indicesBody[14] = 3;
    
}