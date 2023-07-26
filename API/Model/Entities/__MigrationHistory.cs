using System;
using System.Collections.Generic;

namespace Model.Entities
{
    public partial class __MigrationHistory
    {
        public string MigrationId { get; set; } = null!;
        public string ContextKey { get; set; } = null!;
        public byte[] Model { get; set; } = null!;
        public string ProductVersion { get; set; } = null!;
    }
}
