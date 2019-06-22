var turnBtn = document.querySelector('.actions__form');

function getRadioValue(radioboxGroupName)
{
    var group = document.getElementsByName(radioboxGroupName);
    var x = 0;
    for (x; x < group.length; x++)
    {
        if (group[x].checked)
        {
            return (group[x].value);
        }
    }
    return (false);
}

turnBtn.addEventListener('submit', function(event){
    event.preventDefault();
});