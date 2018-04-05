/// <reference path="./user.d.ts" />
/// <reference path="../Tops.Peanut/peanut.d.ts"/>
declare module Tops {
    export interface IRegistrationInfo {
        registrationId : any;
        active : number;
        year : string;
        registrationCode : string;
        statusId : number; // lookup: registration statustypes
        name : string;
        address : string;
        city : string;
        phone : string;
        email : string;
        receivedDate : any;
        notes : string;
        scymNotes : string;
        statusDate : any;
        confirmed: number;
        financialAidAmount  : any;
    }

    export interface IAttender {
        attenderId: any;
        firstName : string;
        lastName : string;
        middleName : string;
        dateOfBirth : any;
        affiliationCode : string;
        otherAffiliation : string;
        firstTimer : number;
        teacher : number;
        guest : number;
        notes : string;
        linens : number;
        arrivalTime  : string;
        departureTime  : string;
        vegetarian : number;
        attended : number;
        singleOccupant : number;
        glutenFree : number;
        changed: boolean;
        housingTypeId : any;
        specialNeedsTypeId : any; // lookup: special needs
        generationId : any; // lookup: generations
        gradeLevel : string; // 'PS','K', 1 .. 13
        ageGroupId : any; // lookup agegroups
        creditTypeId : number; // formerly: feeCredit, lookup: creditTypes
        meals: number[];
    }

    export interface IRegistrationUpdateRequest {
        registration : IRegistrationInfo;
        updatedAttenders : IAttender[];
        deletedAttenders : any[];
        donations: IKeyValuePair[];
        sendConfirmation: boolean;
        previousBalance : any;
    }

    export interface ICostUpdateRequest {
        registrationReceivedDate : any;
        aidAmount  : any;
        attenders : IAttender[];
        deletedAttenders : any[];
        donations: IKeyValuePair[];
        getFundList: number;
    }

    export interface IAgeGroup extends IListItem {
        cutoffAge : any;
    }

    export interface IAgeGroupEditItem extends IAgeGroup {
        active : any;
        errorMessage: string;
        priorState: any;
    }

    export interface IHousingTypeListItem extends IListItem {
        category: any;
    }

    export interface IAnnualSessionInfo {
        year : string;
        startDate : any;
        endDate : any;
        datesText : string;
        location : string
    }

    export interface IRegistrationContext {
        user: IApplicationUser;
        sessionInfo: IAnnualSessionInfo;
    }

    export interface IRegistrationInitResponse {
        sessionInfo : IAnnualSessionInfo;
        user : IRegistrationUser;
        registrationId : any;
        selectedRegistration: IRegistrationResponse;
    }


    export interface IAttenderLookups {
        housingTypes: IHousingTypeListItem[];
        affiliationCodes : IListItem[];
        ageGroups : IAgeGroup[];
    }

    export interface IGetAttenderResponse {
        attender: IAttender;
        lookups: IAttenderLookups;
    }

    export interface IGetAttenderRequest {
        id : any;
        includeLookups : number;
    }

    export interface IFamilyAttender extends INameValuePair {
        firstName: string;
        lastName: string;
        middleName: string;
        generation: number;
        dateOfBirth: string;
    }

    export interface IFindRegistrationAddressResponse {
        name: string;
        address: string;
        city: string;
        persons: IFamilyAttender[];
    }

    export interface IAccountItem {
        amount: number; // currency
        notes: string;
    }

    export interface IAccountDisplayItem {
        id: any;
        registrationId: any;
        itemType: string;
        amountFormatted: string;
        dateAdded: any;
        addedBy: string;
    }

    export interface IPaymentItem extends IAccountItem {
        checkNumber : string; // number or 'cash'
        payor : string;
        type: string; // 'cash' or 'check'
        paymentType: number;
    }

    export interface IPaymentDisplayItem extends IPaymentItem, IAccountDisplayItem {
        dateReceived : any; // date
    }

    export interface IIncomeReportItem extends IPaymentDisplayItem {
        registrationName: string;
        paymentType: number;
    }

    export interface IChargeItem extends IAccountItem {
        feeTypeId: any;
        basis: string;
    }

    export interface IChargeDisplayItem extends IChargeItem, IAccountDisplayItem {
        feeType : string; // lookup by feeTypeId
    }

    export interface ICreditItem extends IAccountItem {
        description: any;
        creditTypeId: any;
        notes: string;
    }

    export interface ICreditDisplayItem extends ICreditItem, IAccountDisplayItem {
        creditType : string; // lookup by creditTypeId
        creditTypeDescription: string;
    }

    export interface IDonationItem extends IAccountItem {
        donationTypeId: any;
        notes: string;
    }
    export interface IDonationDisplayItem extends IDonationItem, IAccountDisplayItem {
        donationType: string; // lookup of donationTypeId
    }

    export interface IAccountLookupItem extends INameValuePair {
        lookupType: string;
    }
    export interface IAccountDetails {
        registrationId: any;
        registrationName: string;
        registrationCode: string;
        lookups: IAccountLookupItem[];
        donations: IDonationDisplayItem[];
        payments: IPaymentDisplayItem[];
        charges: IChargeDisplayItem[];
        credits: ICreditDisplayItem[];
    }

    export interface IDataEntryForm {
        clear : ()=> void;
        validate: () => boolean;
        getValues: () => any;
        setValues: (values: any) => void;
        getErrorMessage: () => string;
        show : ()=> void;
        hide : ()=> void;
    }

    export interface IAccountSummary {
        funds: ILookupItem[];
        fees : IListItem[];
        credits: IListItem[];
        donations: IIndexedItem[];
        payments: IPaymentItem[];
        feeTotal: string;
        creditTotal: string;
        donationTotal: string;
        aidEligibility: string;
        balance: any;
    }

    export interface IHousingInfoItem {
        day: string;
        unit: string;
    }

    export interface IAttenderCheckListItem {
        attenderId: any;
        arrived: any;
        name: string;
        ageGroup: string;
        dietPreference: string;
        specialNeeds: string;
        firstTimer: string,
        meeting: string,
        note: string;
        linens: string,
        housingAssignments : IHousingInfoItem[];
    }

    export interface IRegistrationDashboardResponse {
        registrationId: any,
        registrationCode: string,
        confirmed: any;
        name: string,
        address: string,
        city: string,
        phone: string,
        email: string,
        notes: string,
        status: number,
        statusText: string,
        balanceDue: any,
        attenders: IAttenderCheckListItem[];
        housingAssignment: string;
        registrarNotes: string;
    }

    export interface IRegistrationResponse {
        registration: IRegistrationInfo;
        accountSummary: IAccountSummary;
        attenderList: IListItem[];
        housingAssignments: IListItem[];
    }

    export interface IHousingUnit {
        housingTypeId: number;
        housingUnitId: any;
        unitname: string;
        housingTypeName: string;
        housingCategoryId: number,
        categoryName: string,
        capacity: number;
        description: string;
        active: boolean;
    }


    export interface IHousingAvailabilityItem {
        housingUnitId: number;
        day: number;
        capacity:number;
        occupants: number;
    }


    export interface IHousingType {
        housingTypeId: any;
        housingTypeCode: string;
        housingTypeDescription: string;
        category: number;
    }

    export interface IHousingTypeDisplayItem extends IHousingType {
        active: any;
        categoryName: string;
    }

    export interface IHousingAssignment {
        // housingAssignmentId : any;
        day: number;
        housingUnitId: number;
        note: string;
    }

    export interface IHousingPreference {
        attenderId : number;
        attenderName: string;
        housingPreference: number;
        occupancy; string;
    }

    export interface IAttenderHousingAssignment {
        attender: IHousingPreference,
        assignments: IHousingAssignment[];
    }

    export interface IHousingAssignmentUpdateRequest {
        registrationId: any,
        updates: IHousingAssignmentsUpdate[];
        // confirm: boolean;
    }

    export interface IHousingAssignmentsUpdate {
        attenderId: number;
        assignments: IHousingAssignment[];
    }

    export interface IGetHousingAssignmentsResponse {
        registrationId: number;
        registrationName: string;
        confirmed: any;
        assignments: IAttenderHousingAssignment[];
        units: IHousingUnit[];
        housingTypes : ILookupItem[];
        availability: IHousingAvailabilityItem[];
        // arrivalDay: number;
        // departureDay: number;
    }

    export interface IGetHousingUnitsResponse {
        units: IHousingUnit[];
        types : ILookupItem[];
    }

    export interface IRefreshHousingUnitsResponse {
        units: IHousingUnit[];
        availability: IHousingAvailabilityItem[];
        housingTypes : ILookupItem[];
    }

    export interface IHousingUnitUpdateRequest {
        unitId : any;
        unitname: string;
        capacity: number;
        housingTypeId: any;
    }

    export interface IGetHousingAssignmentsRequest {
        registrationId: number;
        getUnits: boolean;
    }

    export interface IViewModel {
        application: IPeanutClient
    }

    export interface IRegistrationComponent {
        registrationId : KnockoutObservable<any>;
    }

    export interface IHousingViewModel extends IEventSubscriber {
        housingTypes : KnockoutObservableArray<ILookupItem>;
        updateAssignment : (attenderId:number, assignment:IHousingAssignment) => void;
        getHousingUnit : (id:number, unitList?:IHousingUnit[]) => IHousingUnit;
        getHousingType : (id:number) => ILookupItem;
        getHousingUnitList : (typeId:number, day?:number) => IHousingUnit[];
        getAssignments : (registrationId:number) => void;
        reset : () => void;
        initialize : (finalFunction?:() => void) =>void;
    }

    export interface IYouthInfo {
        year : number;
        attenderId : number;
        youthId: number;
        registrationId : number;
        firstName : string;
        lastName : string;
        fullName : string;
        generationId : number;
        generationName : string;
        arrivalTime : any;
        departureTime : any;
        arrivalTimeText : string;
        departureTimeText : string;
        dateOfBirth : string;
        age : any;
        gradeLevel : string;
        registrationName : string;
        sponsor : string;
        specialNeeds : string;
        ageGroup : string;
        ageGroupId : number;
        ageGroupCutoff: any;
        dietPreference : string;
        youthNotes : string;
        attenderNotes : string;
        hasNotes: any;
        formsSubmitted: any;
        affiliationCode: string;
        meeting: string;
    }

    export interface IUpdateYouthRequest {
        youthId : number;
        sponsor : string;
        ageGroupId : number;
        youthNotes : string;
        formsSubmitted: boolean;
    }

    export interface IRegistrationHost extends IEventSubscriber {
        getRegistrationContext : (
            next: (context: IRegistrationContext) => void
        ) => void;
    }

    export interface IDayGroupReportItem {
        dayNumber : number;
        day : string;
    }
    export interface IDayGroup {
        items: KnockoutObservableArray<IDayGroupReportItem>;
        day: string;
    }
    export interface IHousingRequestCountItem extends IDayGroupReportItem{
        housingTypeId : number;
        housingTypeDescription : string;
        confirmed : number;
        requested : number;
        amount: number;
        value: string;

    }

    export interface IReportComponent extends IEventSubscriber {
        initialize : (data : any) => void;
        display : (data : any) => void;
        select : () => void;
    }

    export interface IReportVM {
        name: string;
        vm : IReportComponent;
    }

    export interface IReportOwner extends IEventSubscriber {
        getReportData: (reportName: string, dataHandler: (data: any) => void) => void;
    }

    export interface ILedgerReportItem {
        registrationId : any;
        registrationCode : string;
        name: string;
        attendedCount: number;
        EntryType : string,
        TransactionType : string;
        ItemGroup : number;
        Type: string;
        ItemTypeId: number;
        value: number;
        Amount: string;
    }

    export interface IBalanceSheetItem {
        registrationId: any;
        registrationCode : string;
        name: string;
        attended: any;
        Fees: string;
        Donations: string;
        Credits: string;
        Payments: string;
        Balance: string;
    }

    export interface ILedgerReport {
        ledger: ILedgerReportItem[];
        balanceSheet: IBalanceSheetItem[];
    }

    export interface IRegistrarsReportItem {
        itemName: string;
        registered: number;
        attended: number;
    }

    export interface IFinancialAidReportItem {
        registrationId: any;
        registrationName: string;
        amount: number;
        amountFormatted: string;
        attended: string;
    }

    export interface ICreditsReportItem {
        registrationId: any;
        registrationName: string;
        amount: number;
        amountFormatted: string;
        attended: string;
        creditTypeId : any,
        creditTypeName: any;
    }

    export interface ISubsidiesReportItem {
        registrationId: any;
        registrationName: string;
        attenderName: string;
        sortName: string;
        attended: string;
        creditTypeId : any,
        role: string;
    }
}
