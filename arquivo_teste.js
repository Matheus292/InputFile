
/**
 * @author Matheus Ribeiro Barbosa Santos
 * 
 *  para ver o retorno do json vá em inspecionar elemento 
 * 
 * 
 *  + primeiro adicione o arquivo 
 *  + basta chamar a função getJson onde aparecerá o json com o base 64 
 * 
 */


//Variavel json
var json = null;


//Verificacao se o navegador suporta a api de arquivos
if( window.File && window.FileReader && window.FileList)
{
    document.getElementById( 'arquivo' ).addEventListener( 'change' , FileSelectHandler , false );


    var xhr = new XMLHttpRequest();
    if (xhr.upload)
    {
	
		// file drop
        document.getElementById( 'filedrag' ).addEventListener("dragover", FileDragHover, false);
        document.getElementById( 'filedrag' ).addEventListener("dragleave", FileDragHover, false);
        document.getElementById( 'filedrag' ).addEventListener("drop", FileSelectHandler, false);
        document.getElementById( 'filedrag' ).style.display = "block";
		
		// remove submit button
		//submitbutton.style.display = "none";
	}

  
 
}
else
{
    alert( 'API de arquivos não suportadas neste Navegador' );
}



function FileDragHover(e) {
	e.stopPropagation();
	e.preventDefault();
	e.target.className = (e.type == "dragover" ? "hover" : "");
}

function FileSelectHandler(e) {

	// cancel event and hover styling
	FileDragHover(e);

    // fetch FileList object

    var files = e.target.files || e.dataTransfer.files;


    var f = files[0] //File list


    var maximo =  2 * 1024 * 1024 

    if( f.size > maximo )
    {
        alert( 'Tamanho máximo do arquivo 2MB' );
        return -1;        
    }



    var arquivo = new FileReader( );

    arquivo.onload = (function( file )
    {
        return function( e )
        {
            var binario = e.target.result;

            var base64 = btoa( binario );
          
           objectjson( base64 , f.name , f.type );
            
           alert( 'Arquivo convertido para base 64' );
        };
    } )( f );
    arquivo.readAsBinaryString(f);
	
}



//Cria o json
function objectjson( base64 , nomeArquivo, tipo )
{
    var object = new Object();
    object.base64 = base64;
    object.nome = nomeArquivo;
    object.tipo = tipo;

    setJson( JSON.stringify( object ) );
}

/** set json */
function setJson( json )
{
    this.json = json;
}

/**
 * retorna o json
 */
function getJson()
{ 
    return json;
}


function clique( )
{
    document.getElementById( 'arquivo' ).click();
}