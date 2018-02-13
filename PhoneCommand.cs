using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PhoneCommand
{
    [Icon("pack://application:,,,/PhoneCommand;component/Resources/Icon.png")]
    public class PhoneCommand : Command
    {
        [DisplayName("提取号码单元格")]
        [FormulaProperty(true)]
        public object ExtractPhoneNumberCell { get; set; }

        [DisplayName("提取策略")]
        public ExtractPolicy ExtractPolicy { get; set; }

        [DisplayName("提取号码类型")]
        public ExtractPhoneType ExtractPhoneType { get; set; }

        public override string ToString()
        {
            return "拨打电话命令";
        }

        public override CommandScope GetCommandScope()
        {
            return CommandScope.Cell | CommandScope.ListView | CommandScope.PageLoad;
        }
    }

    public enum ExtractPolicy
    {
        [Description("匹配第一项")]
        ExtractFirstOne,
        [Description("匹配最后一项")]
        ExtractLastOne
    }

    public enum ExtractPhoneType
    {
        [Description("手机号码")]
        Mobile,
        [Description("固定电话号码")]
        Phone
    }
}
