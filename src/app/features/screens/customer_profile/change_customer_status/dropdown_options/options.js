const TransferException = [
    {
        label: "Imporper Transfer-(TE1)",
        value: "TE1",
    },
    {
        label: "Operations Ceased-(TE2)",
        value: "TE2",
    },
    {
        label: "Rule Violation-(TE3)",
        value: "TE3",
    },
    {
        label: "Move Outside Service Area-(TE4)",
        value: "TE4",
    },
];
const statusOption = [
    { label: "Select Status", value: "" },
    {
        label: "Label Printed",
        value: "printed",
    },
    {
        label: "Pre-Shipment",
        value: "preShipment",
    },
    {
        label: "In-Transit",
        value: "intransit",
    },
    {
        label: "Active",
        value: "active",
    },
    {
        label: "Dilevered",
        value: "dilevered",
    },
    {
        label: "Reconnect",
        value: "reconnect",
    },
    {
        label: "Suspend",
        value: "suspend",
    },
    {
        label: "Transfer-In",
        value: "transfer-in",
    },
    {
        label: "Restore",
        value: "restore",
    },
];
const connection = [
    {
        label: "Select Account Type",
        value: "",
    },
    {
        label: "Electronically",
        value: "Electronically",
    },
    {
        label: "Non Electronically",
        value: "Non Electronically",
    },
];
export { TransferException, statusOption, connection };
