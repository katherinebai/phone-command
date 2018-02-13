var PhoneCommand = (function (_super) {
    __extends(PhoneCommand, _super);
    function PhoneCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }

    PhoneCommand.prototype.execute = function () {
        // Get setings
        var commandSettings = this.CommandParam;
        var extractPolicy = commandSettings.ExtractPolicy;
        var extractPhoneNumberCell = commandSettings.ExtractPhoneNumberCell;
        var extractPhoneType = commandSettings.ExtractPhoneType;

        var text = this.evaluateFormula(extractPhoneNumberCell);

        var mobileNumbersArray = [];
        var phoneNumbersArray = [];
        if (extractPhoneType === ExtractPhoneType.Mobile) {
            var mobileNumberMatches = text.match(/\d{3}\s*\d{4}\s*\d{4}/g);
            if (mobileNumberMatches && mobileNumberMatches.length > 0) {
                mobileNumberMatches.map(function (temp) {
                    mobileNumbersArray.push(temp);
                });
            }
        } else if (extractPhoneType === ExtractPhoneType.Phone) {
            var phoneNumberMatches = text.match(/((\+?\s*\d{2,3}\s*\-?\s*)?(\d{2,3})\s*-?\s*)(\d{7,8})(\s*-?\s*(\d{3,}))?/g);
            if (phoneNumberMatches && phoneNumberMatches.length > 0) {
                phoneNumberMatches.map(function (temp) {
                    temp = temp.replace(/\-/g, "");
                    phoneNumbersArray.push(temp);
                });
            }
        }

        var array = mobileNumbersArray;
        if (extractPhoneType === ExtractPhoneType.Phone) {
            array = phoneNumbersArray;
        }
        if (array.length > 0) {
            if (extractPolicy === ExtractPolicy.ExtractFirstOne) {
                window.location.href = "TEL:" + array[0];
            } else if (extractPolicy === ExtractPolicy.ExtractLastOne) {
                window.location.href = "TEL:" + array[array.length - 1];
            }
        }
    }

    return PhoneCommand;
}(Forguncy.CommandBase));

var ExtractPolicy = {
    ExtractFirstOne: 0,
    ExtractLastOne: 1
};

var ExtractPhoneType = {
    Mobile: 0,
    Phone: 1
}

// Key format is "Namespace.ClassName, AssemblyName"
Forguncy.CommandFactory.registerCommand("PhoneCommand.PhoneCommand, PhoneCommand", PhoneCommand);