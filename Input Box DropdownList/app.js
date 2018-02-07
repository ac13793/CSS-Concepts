// Function to call filter list function
$("body").on("keyup paste focusin", '#inputBoxDropdown input', function () {
    $(this).next("small.error").addClass("hidden");
    filterInputDropdownList($(this).val().toLowerCase());
});

// Function to validate SIC field value when user focusout from the field
$("body").on("focusout", '#inputBoxDropdown input', function () {
    $(this).next("small.error").addClass("hidden");
    var value = $(this).val(),
        numRegex = /^\d+$/;
    if ($(this).hasClass("two-digit")) {
        classname = "two-digit";
        if (value && (!(value.length === 2) || !(numRegex.test(value)))) {
            $(this).closest('div').children("small." + classname + "-error").removeClass("hidden");
        } else {
            $(this).closest('div').children("small." + classname + "-error").addClass("hidden");
        }
    }
});

// Function update SIC field value when user selects item form the SIC dropdown
$("body").on("mousedown", '#inputBoxDropdown .dropdown-menu a', function () {
    var sicCode = $(this).data("code");
    $("#inputBoxDropdown input").val(sicCode);
});

// Function to filter SIC list dropdown
function filterInputDropdownList(value) {
    var targetDropdown = $("#inputBoxDropdown .dropdown-menu"),
        listItems = targetDropdown.find('li'),
        foundResult = false;
    if (value) {
        for (var index = 0; index < listItems.length; index++) {
            listVal = $(listItems[index]).find("a");
            if (listVal) {
                if (-1 < $(listVal).text().toLowerCase().indexOf(value)) {
                    $(listItems[index]).removeClass("hidden");
                    foundResult = true;
                } else {
                    $(listItems[index]).addClass("hidden");
                }
            }
        }
        if (!foundResult) {
            $(targetDropdown).addClass("hidden");
        } else {
            $(targetDropdown).removeClass("hidden");
        }
    } else {
        // Show entire list
        $(targetDropdown).removeClass("hidden");
        $(listItems).removeClass("hidden");
    }
}