 

/// <reference path="typings/jasnyBootstrap.d.ts" />
/// <reference path="typings/customKnockout.d.ts" />
/// <reference path="typings/knockout.mapping.d.ts" />
/// <reference path="typings/knockout.d.ts" />
/// <reference path="typings/nativeLibExtension.d.ts" />
/// <reference path="typings/jquery.d.ts" />
/// <reference path="typings/knockoutLibExtension.d.ts" />

module KomonModel.Observables {
   export interface ILanguageTranslation {
        DefinitionId: KnockoutObservable<string>;
        RegionName: KnockoutObservable<string>;
        CultureName: KnockoutObservable<string>;
        TagId: KnockoutObservable<string>;
        Tag: KnockoutObservable<string>;
        ModuleName: KnockoutObservable<string>;
        Description: KnockoutObservable<string>;
        SystemId?: KnockoutObservable<string>;
        SystemName: KnockoutObservable<string>;
        FirstCategory: KnockoutObservable<string>;
        SecondCategory: KnockoutObservable<string>;
        Value: KnockoutObservable<string>;
    }
   export interface IKomonArgument {
        Name: KnockoutObservable<string>;
        Type: KnockoutObservable<KomonArgumentType>;
        DefaultValue: KnockoutObservable<string>;
        Value: KnockoutObservable<string>;
        Options: KnockoutObservableArray<string>;
    }
   export interface ITrendValue {
        Timestamp: KnockoutObservable<Date>;
        Value: KnockoutObservable<number>;
    }
   export interface ITrendWatcherSummary {
        IsOk: KnockoutObservable<boolean>;
        SeriesName: KnockoutObservable<string>;
        CurrentValue?: KnockoutObservable<number>;
        CurrentTimestamp: KnockoutObservable<Date>;
        Threshold1?: KnockoutObservable<number>;
        Threshold2?: KnockoutObservable<number>;
        Timestamp: KnockoutObservable<Date>;
        Type: KnockoutObservable<string>;
        ThreasholdType: KnockoutObservable<string>;
        ExpressionDisplay: KnockoutObservable<string>;
        TimeDisplay: KnockoutObservable<string>;
    }
   export interface IKomonMapItem {
        FromValue: KnockoutObservable<string>;
        ToValue: KnockoutObservable<string>;
    }
   export interface ISystemUser {
        System: KnockoutObservable<KomonSystem>;
        Actions: KnockoutObservableArray<KomonAction>;
        RoleSummary: KnockoutObservable<string>;
    }
   export interface IKomonSystem {
        Id: KnockoutObservable<string>;
        Name: KnockoutObservable<string>;
        DefaultCulture: KnockoutObservable<string>;
    }
   export interface IKomonAction {
        Id: KnockoutObservable<string>;
        Name: KnockoutObservable<string>;
        ModuleName: KnockoutObservable<string>;
    }
   export interface IKomonCategoryGroup {
        Items: KnockoutObservableArray<KomonCategory>;
        ModuleName: KnockoutObservable<string>;
        Name: KnockoutObservable<string>;
        DisplayName: KnockoutObservable<string>;
        Default: KnockoutObservable<KomonCategory>;
    }
   export interface IKomonCategory {
        Id: KnockoutObservable<string>;
        Name: KnockoutObservable<string>;
        DisplayName: KnockoutObservable<string>;
    }
   export interface IWorkflowStatus {
        Id: KnockoutObservable<string>;
        IsFinished: KnockoutObservable<boolean>;
        IsCustom: KnockoutObservable<boolean>;
        ExecutionTime: KnockoutObservable<TimeRanges>;
        ExecutionStartTime: KnockoutObservable<Date>;
        ExecutionDate: KnockoutObservable<Date>;
        StartedBy: KnockoutObservable<string>;
        Name: KnockoutObservable<string>;
    }
   export interface IWorkflowLog {
        Timestamp: KnockoutObservable<Date>;
        Severity: KnockoutObservable<Severity>;
        Message: KnockoutObservable<string>;
    }
   export interface IDebugLog {
        Timestamp: KnockoutObservable<Date>;
        SystemName: KnockoutObservable<string>;
        UserName: KnockoutObservable<string>;
        Process: KnockoutObservable<string>;
        AppDomain: KnockoutObservable<string>;
        Thread: KnockoutObservable<number>;
        Block: KnockoutObservable<string>;
        Severity: KnockoutObservable<Severity>;
        Message: KnockoutObservable<string>;
        ShortBlock: KnockoutObservable<string>;
        ShortMessage: KnockoutObservable<string>;
    }
   export interface ITrendSeriesSummary {
        Id: KnockoutObservable<string>;
        DisplayName: KnockoutObservable<string>;
        Type: KnockoutObservable<string>;
        Data: KnockoutObservableArray<TrendValue>;
    }
   export interface ITrendMeasurment {
        Module: KnockoutObservable<string>;
        Trend: KnockoutObservable<string>;
        Timestamp: KnockoutObservable<Date>;
        Value: KnockoutObservable<number>;
    }
   export interface ITrend {
        Id: KnockoutObservable<string>;
        DisplayName: KnockoutObservable<string>;
        ValueType: KnockoutObservable<string>;
        Series: KnockoutObservableArray<TrendSeries>;
    }
   export interface IUserTrendSummary {
        Series: KnockoutObservableArray<TrendSeriesSummary>;
        Watchers: KnockoutObservableArray<TrendWatcherSummary>;
    }
   export interface IReportDefinition {
        Name: KnockoutObservable<string>;
        GroupName: KnockoutObservable<string>;
        TimeType: KnockoutObservable<ReportTimeType>;
        Type: KnockoutObservable<ReportingType>;
    }
   export interface IReportResult {
        Text: KnockoutObservable<string>;
    }
   export interface ITrendSeries {
        Id: KnockoutObservable<string>;
        DisplayName: KnockoutObservable<string>;
        IsSubscribed: KnockoutObservable<boolean>;
        Watchers: KnockoutObservableArray<TrendWatcher>;
    }
   export interface ITrendWatcher {
        Id: KnockoutObservable<string>;
        DisplayName: KnockoutObservable<string>;
        IsSubscribed: KnockoutObservable<boolean>;
    }
   export interface IKomonMap {
        ModuleName: KnockoutObservable<string>;
        Name: KnockoutObservable<string>;
        From: KnockoutObservable<string>;
        To: KnockoutObservable<string>;
        MapTable: KnockoutObservableArray<KomonMapItem>;
    }
   export interface ILogOnResponse {
        User: KnockoutObservable<KomonUser>;
        PromptChangePassword: KnockoutObservable<boolean>;
        Success: KnockoutObservable<boolean>;
    }
   export interface IKomonUser {
        Id: KnockoutObservable<string>;
        ClientName: KnockoutObservable<string>;
        FirstName: KnockoutObservable<string>;
        LastName: KnockoutObservable<string>;
        Type: KnockoutObservable<UserType>;
        Email: KnockoutObservable<string>;
        Company: KnockoutObservable<string>;
        CultureName: KnockoutObservable<string>;
        Systems: KnockoutObservableArray<SystemUser>;
    }
}


module KomonModel {
    export interface ILanguageTranslation {
        DefinitionId?: string;
        RegionName?: string;
        CultureName?: string;
        TagId?: string;
        Tag?: string;
        ModuleName?: string;
        Description?: string;
        SystemId?: string;
        SystemName?: string;
        FirstCategory?: string;
        SecondCategory?: string;
        Value?: string;
    }
	export class LanguageTranslation extends Komon.Contract.Base.JsonObjectBase<KomonModel.Observables.ILanguageTranslation> {
        DefinitionId: string;
        RegionName: string;
        CultureName: string;
        TagId: string;
        Tag: string;
        ModuleName: string;
        Description: string;
        SystemId: string;
        SystemName: string;
        FirstCategory: string;
        SecondCategory: string;
        Value: string;
    }
    export interface IKomonArgument {
        Name?: string;
        Type?: KomonArgumentType;
        DefaultValue?: string;
        Value?: string;
        Options?: Array<string>;
    }
	export class KomonArgument extends Komon.Contract.Base.JsonObjectBase<KomonModel.Observables.IKomonArgument> {
        Name: string;
        Type: KomonArgumentType;
        DefaultValue: string;
        Value: string;
        Options: Array<string>;
    }
    export interface ITrendValue {
        Timestamp?: Date;
        Value?: number;
    }
	export class TrendValue extends Komon.Contract.Base.JsonObjectBase<KomonModel.Observables.ITrendValue> {
        Timestamp: Date;
        Value: number;
    }
    export interface ITrendWatcherSummary {
        IsOk?: boolean;
        SeriesName?: string;
        CurrentValue?: number;
        CurrentTimestamp?: Date;
        Threshold1?: number;
        Threshold2?: number;
        Timestamp?: Date;
        Type?: string;
        ThreasholdType?: string;
        ExpressionDisplay?: string;
        TimeDisplay?: string;
    }
	export class TrendWatcherSummary extends Komon.Contract.Base.JsonObjectBase<KomonModel.Observables.ITrendWatcherSummary> {
        IsOk: boolean;
        SeriesName: string;
        CurrentValue: number;
        CurrentTimestamp: Date;
        Threshold1: number;
        Threshold2: number;
        Timestamp: Date;
        Type: string;
        ThreasholdType: string;
        ExpressionDisplay: string;
        TimeDisplay: string;
    }
    export interface IKomonMapItem {
        FromValue?: string;
        ToValue?: string;
    }
	export class KomonMapItem extends Komon.Contract.Base.JsonObjectBase<KomonModel.Observables.IKomonMapItem> {
        FromValue: string;
        ToValue: string;
    }
    export interface ISystemUser {
        System?: KomonSystem;
        Actions?: Array<KomonAction>;
        RoleSummary?: string;
    }
	export class SystemUser extends Komon.Contract.Base.JsonObjectBase<KomonModel.Observables.ISystemUser> {
        System: KomonSystem;
        Actions: Array<KomonAction>;
        RoleSummary: string;
    }
    export interface IKomonSystem {
        Id?: string;
        Name?: string;
        DefaultCulture?: string;
    }
	export class KomonSystem extends Komon.Contract.Base.JsonObjectBase<KomonModel.Observables.IKomonSystem> {
        Id: string;
        Name: string;
        DefaultCulture: string;
    }
    export interface IKomonAction {
        Id?: string;
        Name?: string;
        ModuleName?: string;
    }
	export class KomonAction extends Komon.Contract.Base.JsonObjectBase<KomonModel.Observables.IKomonAction> {
        Id: string;
        Name: string;
        ModuleName: string;
    }
    export interface IKomonCategoryGroup {
        Items?: Array<KomonCategory>;
        ModuleName?: string;
        Name?: string;
        DisplayName?: string;
        Default?: KomonCategory;
    }
	export class KomonCategoryGroup extends Komon.Contract.Base.JsonObjectBase<KomonModel.Observables.IKomonCategoryGroup> {
        Items: Array<KomonCategory>;
        ModuleName: string;
        Name: string;
        DisplayName: string;
        Default: KomonCategory;
    }
    export interface IKomonCategory {
        Id?: string;
        Name?: string;
        DisplayName?: string;
    }
	export class KomonCategory extends Komon.Contract.Base.JsonObjectBase<KomonModel.Observables.IKomonCategory> {
        Id: string;
        Name: string;
        DisplayName: string;
    }
    export interface IWorkflowStatus {
        Id?: string;
        IsFinished?: boolean;
        IsCustom?: boolean;
        ExecutionTime?: TimeRanges;
        ExecutionStartTime?: Date;
        ExecutionDate?: Date;
        StartedBy?: string;
        Name?: string;
    }
	export class WorkflowStatus extends Komon.Contract.Base.JsonObjectBase<KomonModel.Observables.IWorkflowStatus> {
        Id: string;
        IsFinished: boolean;
        IsCustom: boolean;
        ExecutionTime: TimeRanges;
        ExecutionStartTime: Date;
        ExecutionDate: Date;
        StartedBy: string;
        Name: string;
    }
    export interface IWorkflowLog {
        Timestamp?: Date;
        Severity?: Severity;
        Message?: string;
    }
	export class WorkflowLog extends Komon.Contract.Base.JsonObjectBase<KomonModel.Observables.IWorkflowLog> {
        Timestamp: Date;
        Severity: Severity;
        Message: string;
    }
    export interface IDebugLog {
        Timestamp?: Date;
        SystemName?: string;
        UserName?: string;
        Process?: string;
        AppDomain?: string;
        Thread?: number;
        Block?: string;
        Severity?: Severity;
        Message?: string;
        ShortBlock?: string;
        ShortMessage?: string;
    }
	export class DebugLog extends Komon.Contract.Base.JsonObjectBase<KomonModel.Observables.IDebugLog> {
        Timestamp: Date;
        SystemName: string;
        UserName: string;
        Process: string;
        AppDomain: string;
        Thread: number;
        Block: string;
        Severity: Severity;
        Message: string;
        ShortBlock: string;
        ShortMessage: string;
    }
    export interface ITrendSeriesSummary {
        Id?: string;
        DisplayName?: string;
        Type?: string;
        Data?: Array<TrendValue>;
    }
	export class TrendSeriesSummary extends Komon.Contract.Base.JsonObjectBase<KomonModel.Observables.ITrendSeriesSummary> {
        Id: string;
        DisplayName: string;
        Type: string;
        Data: Array<TrendValue>;
    }
    export interface ITrendMeasurment {
        Module?: string;
        Trend?: string;
        Timestamp?: Date;
        Value?: number;
    }
	export class TrendMeasurment extends Komon.Contract.Base.JsonObjectBase<KomonModel.Observables.ITrendMeasurment> {
        Module: string;
        Trend: string;
        Timestamp: Date;
        Value: number;
    }
    export interface ITrend {
        Id?: string;
        DisplayName?: string;
        ValueType?: string;
        Series?: Array<TrendSeries>;
    }
	export class Trend extends Komon.Contract.Base.JsonObjectBase<KomonModel.Observables.ITrend> {
        Id: string;
        DisplayName: string;
        ValueType: string;
        Series: Array<TrendSeries>;
    }
    export interface IUserTrendSummary {
        Series?: Array<TrendSeriesSummary>;
        Watchers?: Array<TrendWatcherSummary>;
    }
	export class UserTrendSummary extends Komon.Contract.Base.JsonObjectBase<KomonModel.Observables.IUserTrendSummary> {
        Series: Array<TrendSeriesSummary>;
        Watchers: Array<TrendWatcherSummary>;
    }
    export interface IReportDefinition {
        Name?: string;
        GroupName?: string;
        TimeType?: ReportTimeType;
        Type?: ReportingType;
    }
	export class ReportDefinition extends Komon.Contract.Base.JsonObjectBase<KomonModel.Observables.IReportDefinition> {
        Name: string;
        GroupName: string;
        TimeType: ReportTimeType;
        Type: ReportingType;
    }
    export interface IReportResult {
        Text?: string;
    }
	export class ReportResult extends Komon.Contract.Base.JsonObjectBase<KomonModel.Observables.IReportResult> {
        Text: string;
    }
    export interface ITrendSeries {
        Id?: string;
        DisplayName?: string;
        IsSubscribed?: boolean;
        Watchers?: Array<TrendWatcher>;
    }
	export class TrendSeries extends Komon.Contract.Base.JsonObjectBase<KomonModel.Observables.ITrendSeries> {
        Id: string;
        DisplayName: string;
        IsSubscribed: boolean;
        Watchers: Array<TrendWatcher>;
    }
    export interface ITrendWatcher {
        Id?: string;
        DisplayName?: string;
        IsSubscribed?: boolean;
    }
	export class TrendWatcher extends Komon.Contract.Base.JsonObjectBase<KomonModel.Observables.ITrendWatcher> {
        Id: string;
        DisplayName: string;
        IsSubscribed: boolean;
    }
    export interface IKomonMap {
        ModuleName?: string;
        Name?: string;
        From?: string;
        To?: string;
        MapTable?: Array<KomonMapItem>;
    }
	export class KomonMap extends Komon.Contract.Base.JsonObjectBase<KomonModel.Observables.IKomonMap> {
        ModuleName: string;
        Name: string;
        From: string;
        To: string;
        MapTable: Array<KomonMapItem>;
    }
    export interface ILogOnResponse {
        User?: KomonUser;
        PromptChangePassword?: boolean;
        Success?: boolean;
    }
	export class LogOnResponse extends Komon.Contract.Base.JsonObjectBase<KomonModel.Observables.ILogOnResponse> {
        User: KomonUser;
        PromptChangePassword: boolean;
        Success: boolean;
    }
    export interface IKomonUser {
        Id?: string;
        ClientName?: string;
        FirstName?: string;
        LastName?: string;
        Type?: UserType;
        Email?: string;
        Company?: string;
        CultureName?: string;
        Systems?: Array<SystemUser>;
    }
	export class KomonUser extends Komon.Contract.Base.JsonObjectBase<KomonModel.Observables.IKomonUser> {
        Id: string;
        ClientName: string;
        FirstName: string;
        LastName: string;
        Type: UserType;
        Email: string;
        Company: string;
        CultureName: string;
        Systems: Array<SystemUser>;
    }
    export enum UserType {
        User,
        ServiceUser,
        SuperUser,
        Impersonate,
        Impersonated,
    }
    export enum Severity {
        Verbose,
        Information,
        Warning,
        Error,
        Critical,
    }
    export enum KomonArgumentType {
        Boolean,
        Integer,
        Double,
        Enum,
        String,
        DateTime,
    }
    export enum ReportTimeType {
        Snapshot,
        Daily,
    }
    export enum ReportingType {
        Text,
        ListOfPanelists,
        Csv,
    }
   export class ConfigurationService {  
	    _client: KomonFramework.Client = new KomonFramework.Client(KomonFramework.Config.WebApiBaseAddress, "ConfigurationService");


		GetSystems() : KomonFramework.Promise<Komon.Contract.Base.KomonResult<Array<SystemDefinition>,KnockoutObservableArray<SystemDefinition>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
		    
			return this._client.PostServer<Array<SystemDefinition>,KnockoutObservableArray<SystemDefinition>>("GetSystems",ps);
	
		}

		UpdateSystemDefinition(system:SystemDefinition) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<SystemDefinition,KnockoutObservable<SystemDefinition>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "system", Value: system });
		    
			return this._client.PostServer<SystemDefinition,KnockoutObservable<SystemDefinition>>("UpdateSystemDefinition",ps);
	
		}

		DeleteSystemDefinition(system:SystemDefinition) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<void,KnockoutObservable<void>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "system", Value: system });
		    
			return this._client.PostServer<void,KnockoutObservable<void>>("DeleteSystemDefinition",ps);
	
		}

		GetLanguageDefinitions() : KomonFramework.Promise<Komon.Contract.Base.KomonResult<Array<LanguageDefinition>,KnockoutObservableArray<LanguageDefinition>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
		    
			return this._client.PostServer<Array<LanguageDefinition>,KnockoutObservableArray<LanguageDefinition>>("GetLanguageDefinitions",ps);
	
		}

		UpdateLanguageDefinition(language:LanguageDefinition) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<LanguageDefinition,KnockoutObservable<LanguageDefinition>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "language", Value: language });
		    
			return this._client.PostServer<LanguageDefinition,KnockoutObservable<LanguageDefinition>>("UpdateLanguageDefinition",ps);
	
		}

		DeleteLanguageDefinition(language:LanguageDefinition) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<void,KnockoutObservable<void>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "language", Value: language });
		    
			return this._client.PostServer<void,KnockoutObservable<void>>("DeleteLanguageDefinition",ps);
	
		}

		GetLanguageTags() : KomonFramework.Promise<Komon.Contract.Base.KomonResult<Array<LanguageTag>,KnockoutObservableArray<LanguageTag>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
		    
			return this._client.PostServer<Array<LanguageTag>,KnockoutObservableArray<LanguageTag>>("GetLanguageTags",ps);
	
		}

		UpdateLanguageTag(tag:LanguageTag) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<LanguageTag,KnockoutObservable<LanguageTag>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "tag", Value: tag });
		    
			return this._client.PostServer<LanguageTag,KnockoutObservable<LanguageTag>>("UpdateLanguageTag",ps);
	
		}

		DeleteLanguageTag(tag:LanguageTag) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<void,KnockoutObservable<void>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "tag", Value: tag });
		    
			return this._client.PostServer<void,KnockoutObservable<void>>("DeleteLanguageTag",ps);
	
		}

		GetSystemTranslations() : KomonFramework.Promise<Komon.Contract.Base.KomonResult<Array<LanguageTranslation>,KnockoutObservableArray<LanguageTranslation>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
		    
			return this._client.PostServer<Array<LanguageTranslation>,KnockoutObservableArray<LanguageTranslation>>("GetSystemTranslations",ps);
	
		}

		UpdateSystemTranslations(translations:Array<LanguageTranslation>) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<Array<LanguageTranslation>,KnockoutObservableArray<LanguageTranslation>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "translations", Value: translations });
		    
			return this._client.PostServer<Array<LanguageTranslation>,KnockoutObservableArray<LanguageTranslation>>("UpdateSystemTranslations",ps);
	
		}

		GetActions() : KomonFramework.Promise<Komon.Contract.Base.KomonResult<Array<ActionDefinition>,KnockoutObservableArray<ActionDefinition>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
		    
			return this._client.PostServer<Array<ActionDefinition>,KnockoutObservableArray<ActionDefinition>>("GetActions",ps);
	
		}

		UpdateAction(action:ActionDefinition) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<ActionDefinition,KnockoutObservable<ActionDefinition>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "action", Value: action });
		    
			return this._client.PostServer<ActionDefinition,KnockoutObservable<ActionDefinition>>("UpdateAction",ps);
	
		}

		DeleteAction(action:ActionDefinition) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<void,KnockoutObservable<void>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "action", Value: action });
		    
			return this._client.PostServer<void,KnockoutObservable<void>>("DeleteAction",ps);
	
		}

		GetUsers() : KomonFramework.Promise<Komon.Contract.Base.KomonResult<Array<UserDefinition>,KnockoutObservableArray<UserDefinition>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
		    
			return this._client.PostServer<Array<UserDefinition>,KnockoutObservableArray<UserDefinition>>("GetUsers",ps);
	
		}

		ResetPassword(resetPassword:ResetPassword) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<void,KnockoutObservable<void>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "resetPassword", Value: resetPassword });
		    
			return this._client.PostServer<void,KnockoutObservable<void>>("ResetPassword",ps);
	
		}

		UpdateUser(user:UserDefinition) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<UserDefinition,KnockoutObservable<UserDefinition>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "user", Value: user });
		    
			return this._client.PostServer<UserDefinition,KnockoutObservable<UserDefinition>>("UpdateUser",ps);
	
		}

		DeleteUser(user:UserDefinition) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<void,KnockoutObservable<void>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "user", Value: user });
		    
			return this._client.PostServer<void,KnockoutObservable<void>>("DeleteUser",ps);
	
		}

		GetUserGroups() : KomonFramework.Promise<Komon.Contract.Base.KomonResult<Array<UserGroupDefinition>,KnockoutObservableArray<UserGroupDefinition>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
		    
			return this._client.PostServer<Array<UserGroupDefinition>,KnockoutObservableArray<UserGroupDefinition>>("GetUserGroups",ps);
	
		}

		UpdateUserGroup(user:UserGroupDefinition) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<UserGroupDefinition,KnockoutObservable<UserGroupDefinition>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "user", Value: user });
		    
			return this._client.PostServer<UserGroupDefinition,KnockoutObservable<UserGroupDefinition>>("UpdateUserGroup",ps);
	
		}

		DeleteUserGroup(user:UserGroupDefinition) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<void,KnockoutObservable<void>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "user", Value: user });
		    
			return this._client.PostServer<void,KnockoutObservable<void>>("DeleteUserGroup",ps);
	
		}

		GetRoles() : KomonFramework.Promise<Komon.Contract.Base.KomonResult<Array<RoleDefinition>,KnockoutObservableArray<RoleDefinition>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
		    
			return this._client.PostServer<Array<RoleDefinition>,KnockoutObservableArray<RoleDefinition>>("GetRoles",ps);
	
		}

		UpdateRole(role:RoleDefinition) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<RoleDefinition,KnockoutObservable<RoleDefinition>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "role", Value: role });
		    
			return this._client.PostServer<RoleDefinition,KnockoutObservable<RoleDefinition>>("UpdateRole",ps);
	
		}

		DeleteRole(role:RoleDefinition) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<void,KnockoutObservable<void>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "role", Value: role });
		    
			return this._client.PostServer<void,KnockoutObservable<void>>("DeleteRole",ps);
	
		}

		GetParameterDefinitions() : KomonFramework.Promise<Komon.Contract.Base.KomonResult<Array<ParameterDefinition>,KnockoutObservableArray<ParameterDefinition>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
		    
			return this._client.PostServer<Array<ParameterDefinition>,KnockoutObservableArray<ParameterDefinition>>("GetParameterDefinitions",ps);
	
		}

		UpdateParameterDefinition(definition:ParameterDefinition) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<ParameterDefinition,KnockoutObservable<ParameterDefinition>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "definition", Value: definition });
		    
			return this._client.PostServer<ParameterDefinition,KnockoutObservable<ParameterDefinition>>("UpdateParameterDefinition",ps);
	
		}

		DeleteParameterDefinition(definition:ParameterDefinition) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<void,KnockoutObservable<void>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "definition", Value: definition });
		    
			return this._client.PostServer<void,KnockoutObservable<void>>("DeleteParameterDefinition",ps);
	
		}

		GetSystemParameters() : KomonFramework.Promise<Komon.Contract.Base.KomonResult<Array<SystemParameter>,KnockoutObservableArray<SystemParameter>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
		    
			return this._client.PostServer<Array<SystemParameter>,KnockoutObservableArray<SystemParameter>>("GetSystemParameters",ps);
	
		}

		UpdateSystemParameter(parameter:SystemParameter) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<SystemParameter,KnockoutObservable<SystemParameter>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "parameter", Value: parameter });
		    
			return this._client.PostServer<SystemParameter,KnockoutObservable<SystemParameter>>("UpdateSystemParameter",ps);
	
		}

		GetSystemCategoryGroups() : KomonFramework.Promise<Komon.Contract.Base.KomonResult<Array<CategoryGroupDefinition>,KnockoutObservableArray<CategoryGroupDefinition>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
		    
			return this._client.PostServer<Array<CategoryGroupDefinition>,KnockoutObservableArray<CategoryGroupDefinition>>("GetSystemCategoryGroups",ps);
	
		}

		UpdateSystemCategoryGroup(category:CategoryGroupDefinition) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<CategoryGroupDefinition,KnockoutObservable<CategoryGroupDefinition>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "category", Value: category });
		    
			return this._client.PostServer<CategoryGroupDefinition,KnockoutObservable<CategoryGroupDefinition>>("UpdateSystemCategoryGroup",ps);
	
		}

		DeleteSystemCategoryGroup(category:CategoryGroupDefinition) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<void,KnockoutObservable<void>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "category", Value: category });
		    
			return this._client.PostServer<void,KnockoutObservable<void>>("DeleteSystemCategoryGroup",ps);
	
		}

		GetSystemCategories(GroupId:string) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<Array<CategoryDefinition>,KnockoutObservableArray<CategoryDefinition>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "GroupId", Value: GroupId });
		    
			return this._client.PostServer<Array<CategoryDefinition>,KnockoutObservableArray<CategoryDefinition>>("GetSystemCategories",ps);
	
		}

		UpdateSystemCategory(category:CategoryDefinition) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<CategoryDefinition,KnockoutObservable<CategoryDefinition>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "category", Value: category });
		    
			return this._client.PostServer<CategoryDefinition,KnockoutObservable<CategoryDefinition>>("UpdateSystemCategory",ps);
	
		}

		DeleteSystemCategory(category:CategoryDefinition) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<void,KnockoutObservable<void>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "category", Value: category });
		    
			return this._client.PostServer<void,KnockoutObservable<void>>("DeleteSystemCategory",ps);
	
		}

		GetMapping() : KomonFramework.Promise<Komon.Contract.Base.KomonResult<Array<MapDefinition>,KnockoutObservableArray<MapDefinition>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
		    
			return this._client.PostServer<Array<MapDefinition>,KnockoutObservableArray<MapDefinition>>("GetMapping",ps);
	
		}

		UpdateMapping(mapping:MapDefinition) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<MapDefinition,KnockoutObservable<MapDefinition>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "mapping", Value: mapping });
		    
			return this._client.PostServer<MapDefinition,KnockoutObservable<MapDefinition>>("UpdateMapping",ps);
	
		}

		DeleteMapping(mapping:MapDefinition) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<void,KnockoutObservable<void>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "mapping", Value: mapping });
		    
			return this._client.PostServer<void,KnockoutObservable<void>>("DeleteMapping",ps);
	
		}

		GetMapItems(mappingId:string) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<Array<MapItemDefinition>,KnockoutObservableArray<MapItemDefinition>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "mappingId", Value: mappingId });
		    
			return this._client.PostServer<Array<MapItemDefinition>,KnockoutObservableArray<MapItemDefinition>>("GetMapItems",ps);
	
		}

		UpdateMapItem(mapItem:MapItemDefinition) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<MapItemDefinition,KnockoutObservable<MapItemDefinition>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "mapItem", Value: mapItem });
		    
			return this._client.PostServer<MapItemDefinition,KnockoutObservable<MapItemDefinition>>("UpdateMapItem",ps);
	
		}

		DeleteMapItem(mapItem:MapItemDefinition) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<void,KnockoutObservable<void>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "mapItem", Value: mapItem });
		    
			return this._client.PostServer<void,KnockoutObservable<void>>("DeleteMapItem",ps);
	
		}

		GetTrendWatchers(serieId:string) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<Array<TrendWatcherDefinition>,KnockoutObservableArray<TrendWatcherDefinition>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "serieId", Value: serieId });
		    
			return this._client.PostServer<Array<TrendWatcherDefinition>,KnockoutObservableArray<TrendWatcherDefinition>>("GetTrendWatchers",ps);
	
		}

		UpdateTrendWatcher(watcher:TrendWatcherDefinition) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<TrendWatcherDefinition,KnockoutObservable<TrendWatcherDefinition>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "watcher", Value: watcher });
		    
			return this._client.PostServer<TrendWatcherDefinition,KnockoutObservable<TrendWatcherDefinition>>("UpdateTrendWatcher",ps);
	
		}

		DeleteTrendWatcher(watcher:TrendWatcherDefinition) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<void,KnockoutObservable<void>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "watcher", Value: watcher });
		    
			return this._client.PostServer<void,KnockoutObservable<void>>("DeleteTrendWatcher",ps);
	
		}

		GetTrendGroups() : KomonFramework.Promise<Komon.Contract.Base.KomonResult<Array<TrendGroupDefinition>,KnockoutObservableArray<TrendGroupDefinition>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
		    
			return this._client.PostServer<Array<TrendGroupDefinition>,KnockoutObservableArray<TrendGroupDefinition>>("GetTrendGroups",ps);
	
		}

		UpdateTrendGroup(group:TrendGroupDefinition) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<TrendGroupDefinition,KnockoutObservable<TrendGroupDefinition>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "group", Value: group });
		    
			return this._client.PostServer<TrendGroupDefinition,KnockoutObservable<TrendGroupDefinition>>("UpdateTrendGroup",ps);
	
		}

		GetTrendSeries(groupId:string) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<Array<TrendSeriesDefinition>,KnockoutObservableArray<TrendSeriesDefinition>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "groupId", Value: groupId });
		    
			return this._client.PostServer<Array<TrendSeriesDefinition>,KnockoutObservableArray<TrendSeriesDefinition>>("GetTrendSeries",ps);
	
		}

		UpdateTrendSeries(series:TrendSeriesDefinition) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<TrendSeriesDefinition,KnockoutObservable<TrendSeriesDefinition>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "series", Value: series });
		    
			return this._client.PostServer<TrendSeriesDefinition,KnockoutObservable<TrendSeriesDefinition>>("UpdateTrendSeries",ps);
	
		}

		GetWorkflows() : KomonFramework.Promise<Komon.Contract.Base.KomonResult<Array<WorkflowDefinition>,KnockoutObservableArray<WorkflowDefinition>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
		    
			return this._client.PostServer<Array<WorkflowDefinition>,KnockoutObservableArray<WorkflowDefinition>>("GetWorkflows",ps);
	
		}

		UpdateWorkflow(definition:WorkflowDefinition) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<WorkflowDefinition,KnockoutObservable<WorkflowDefinition>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "definition", Value: definition });
		    
			return this._client.PostServer<WorkflowDefinition,KnockoutObservable<WorkflowDefinition>>("UpdateWorkflow",ps);
	
		}

		GetWorkflowSteps(definitionId:string) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<Array<WorkflowStepDefinition>,KnockoutObservableArray<WorkflowStepDefinition>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "definitionId", Value: definitionId });
		    
			return this._client.PostServer<Array<WorkflowStepDefinition>,KnockoutObservableArray<WorkflowStepDefinition>>("GetWorkflowSteps",ps);
	
		}

		UpdateWorkflowStep(step:WorkflowStepDefinition) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<WorkflowStepDefinition,KnockoutObservable<WorkflowStepDefinition>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "step", Value: step });
		    
			return this._client.PostServer<WorkflowStepDefinition,KnockoutObservable<WorkflowStepDefinition>>("UpdateWorkflowStep",ps);
	
		}

		GetWorkflowStatuses(definitionId:string) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<Array<WorkflowStatus>,KnockoutObservableArray<WorkflowStatus>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "definitionId", Value: definitionId });
		    
			return this._client.PostServer<Array<WorkflowStatus>,KnockoutObservableArray<WorkflowStatus>>("GetWorkflowStatuses",ps);
	
		}

		GetWorkflowLogs(statusId:string) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<Array<WorkflowLog>,KnockoutObservableArray<WorkflowLog>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "statusId", Value: statusId });
		    
			return this._client.PostServer<Array<WorkflowLog>,KnockoutObservableArray<WorkflowLog>>("GetWorkflowLogs",ps);
	
		}
    }
   export class MonitorService {  
	    _client: KomonFramework.Client = new KomonFramework.Client(KomonFramework.Config.WebApiBaseAddress, "MonitorService");


		Log(de:Array<DebugLog>) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<void,KnockoutObservable<void>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "de", Value: de });
		    
			return this._client.PostServer<void,KnockoutObservable<void>>("Log",ps);
	
		}

		GetLogs(filter:LogFilter) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<Array<DebugLog>,KnockoutObservableArray<DebugLog>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "filter", Value: filter });
		    
			return this._client.PostServer<Array<DebugLog>,KnockoutObservableArray<DebugLog>>("GetLogs",ps);
	
		}

		LogTrend(data:Array<TrendMeasurment>) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<void,KnockoutObservable<void>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "data", Value: data });
		    
			return this._client.PostServer<void,KnockoutObservable<void>>("LogTrend",ps);
	
		}

		GetTrends() : KomonFramework.Promise<Komon.Contract.Base.KomonResult<Array<Trend>,KnockoutObservableArray<Trend>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
		    
			return this._client.PostServer<Array<Trend>,KnockoutObservableArray<Trend>>("GetTrends",ps);
	
		}

		GetTrendValues(seriesId:string) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<TrendSeriesSummary,KnockoutObservable<TrendSeriesSummary>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "seriesId", Value: seriesId });
		    
			return this._client.PostServer<TrendSeriesSummary,KnockoutObservable<TrendSeriesSummary>>("GetTrendValues",ps);
	
		}

		GetUserTrendSummary() : KomonFramework.Promise<Komon.Contract.Base.KomonResult<UserTrendSummary,KnockoutObservable<UserTrendSummary>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
		    
			return this._client.PostServer<UserTrendSummary,KnockoutObservable<UserTrendSummary>>("GetUserTrendSummary",ps);
	
		}

		ToggleSerieSubscription(series:TrendSeries) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<boolean,KnockoutObservable<boolean>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "series", Value: series });
		    
			return this._client.PostServer<boolean,KnockoutObservable<boolean>>("ToggleSerieSubscription",ps);
	
		}

		ToggleWatcherSubscription(watcher:TrendWatcher) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<boolean,KnockoutObservable<boolean>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "watcher", Value: watcher });
		    
			return this._client.PostServer<boolean,KnockoutObservable<boolean>>("ToggleWatcherSubscription",ps);
	
		}
    }
   export class ReportingService {  
	    _client: KomonFramework.Client = new KomonFramework.Client(KomonFramework.Config.WebApiBaseAddress, "ReportingService");


		GetReportDefinitions() : KomonFramework.Promise<Komon.Contract.Base.KomonResult<Array<ReportDefinition>,KnockoutObservableArray<ReportDefinition>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
		    
			return this._client.PostServer<Array<ReportDefinition>,KnockoutObservableArray<ReportDefinition>>("GetReportDefinitions",ps);
	
		}

		GetReport(context:ReportingContext) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<ReportResult,KnockoutObservable<ReportResult>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "context", Value: context });
		    
			return this._client.PostServer<ReportResult,KnockoutObservable<ReportResult>>("GetReport",ps);
	
		}
    }
   export class ResourceService {  
	    _client: KomonFramework.Client = new KomonFramework.Client(KomonFramework.Config.WebApiBaseAddress, "ResourceService");


		GetTranslations(cultureName:string) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<Array<KomonTranslation>,KnockoutObservableArray<KomonTranslation>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "cultureName", Value: cultureName });
		    
			return this._client.PostServer<Array<KomonTranslation>,KnockoutObservableArray<KomonTranslation>>("GetTranslations",ps);
	
		}

		SetTranslations(cultureName:string,komon:KomonTranslation) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<void,KnockoutObservable<void>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "cultureName", Value: cultureName });
            ps.push({ Key: "komon", Value: komon });
		    
			return this._client.PostServer<void,KnockoutObservable<void>>("SetTranslations",ps);
	
		}

		GetParameters() : KomonFramework.Promise<Komon.Contract.Base.KomonResult<Array<KomonParameter>,KnockoutObservableArray<KomonParameter>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
		    
			return this._client.PostServer<Array<KomonParameter>,KnockoutObservableArray<KomonParameter>>("GetParameters",ps);
	
		}

		SetParameter(parameter:KomonParameter) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<void,KnockoutObservable<void>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "parameter", Value: parameter });
		    
			return this._client.PostServer<void,KnockoutObservable<void>>("SetParameter",ps);
	
		}

		GetCategoryGroups() : KomonFramework.Promise<Komon.Contract.Base.KomonResult<Array<KomonCategoryGroup>,KnockoutObservableArray<KomonCategoryGroup>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
		    
			return this._client.PostServer<Array<KomonCategoryGroup>,KnockoutObservableArray<KomonCategoryGroup>>("GetCategoryGroups",ps);
	
		}

		GetCachedKeys() : KomonFramework.Promise<Komon.Contract.Base.KomonResult<Array<string>,KnockoutObservableArray<string>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
		    
			return this._client.PostServer<Array<string>,KnockoutObservableArray<string>>("GetCachedKeys",ps);
	
		}

		GetCachedItem(key:string) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<KomonCacheItem,KnockoutObservable<KomonCacheItem>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "key", Value: key });
		    
			return this._client.PostServer<KomonCacheItem,KnockoutObservable<KomonCacheItem>>("GetCachedItem",ps);
	
		}

		UpdateCachedItem(item:KomonCacheItem) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<void,KnockoutObservable<void>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "item", Value: item });
		    
			return this._client.PostServer<void,KnockoutObservable<void>>("UpdateCachedItem",ps);
	
		}

		DeleteCachedItem(item:KomonCacheItem) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<void,KnockoutObservable<void>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "item", Value: item });
		    
			return this._client.PostServer<void,KnockoutObservable<void>>("DeleteCachedItem",ps);
	
		}

		GetMap(module:string,name:string) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<KomonMap,KnockoutObservable<KomonMap>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "module", Value: module });
            ps.push({ Key: "name", Value: name });
		    
			return this._client.PostServer<KomonMap,KnockoutObservable<KomonMap>>("GetMap",ps);
	
		}

		GetMapItems(module:string,mapName:string,values:Array<string>,compareToValues:boolean) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<Array<KomonMapItem>,KnockoutObservableArray<KomonMapItem>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "module", Value: module });
            ps.push({ Key: "mapName", Value: mapName });
            ps.push({ Key: "values", Value: values });
            ps.push({ Key: "compareToValues", Value: compareToValues });
		    
			return this._client.PostServer<Array<KomonMapItem>,KnockoutObservableArray<KomonMapItem>>("GetMapItems",ps);
	
		}

		InsertMapItems(module:string,mapName:string,fromValues:Array<KomonMapItem>) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<void,KnockoutObservable<void>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "module", Value: module });
            ps.push({ Key: "mapName", Value: mapName });
            ps.push({ Key: "fromValues", Value: fromValues });
		    
			return this._client.PostServer<void,KnockoutObservable<void>>("InsertMapItems",ps);
	
		}

		Map(module:string,name:string,fromValue:string) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<string,KnockoutObservable<string>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "module", Value: module });
            ps.push({ Key: "name", Value: name });
            ps.push({ Key: "fromValue", Value: fromValue });
		    
			return this._client.PostServer<string,KnockoutObservable<string>>("Map",ps);
	
		}

		GetCounterNextValue(name:string) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<number,KnockoutObservable<number>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "name", Value: name });
		    
			return this._client.PostServer<number,KnockoutObservable<number>>("GetCounterNextValue",ps);
	
		}
    }
   export class UserManagementService {  
	    _client: KomonFramework.Client = new KomonFramework.Client(KomonFramework.Config.WebApiBaseAddress, "UserManagementService");


		LogOn(userName:string,password:string) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<LogOnResponse,KnockoutObservable<LogOnResponse>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "userName", Value: userName });
            ps.push({ Key: "password", Value: password });
		    
			return this._client.PostServer<LogOnResponse,KnockoutObservable<LogOnResponse>>("LogOn",ps);
	
		}

		SignOut() : KomonFramework.Promise<Komon.Contract.Base.KomonResult<void,KnockoutObservable<void>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
		    
			return this._client.PostServer<void,KnockoutObservable<void>>("SignOut",ps);
	
		}

		Authenticate(userId:string) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<KomonUser,KnockoutObservable<KomonUser>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "userId", Value: userId });
		    
			return this._client.PostServer<KomonUser,KnockoutObservable<KomonUser>>("Authenticate",ps);
	
		}

		GetUsers() : KomonFramework.Promise<Komon.Contract.Base.KomonResult<Array<KomonUser>,KnockoutObservableArray<KomonUser>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
		    
			return this._client.PostServer<Array<KomonUser>,KnockoutObservableArray<KomonUser>>("GetUsers",ps);
	
		}

		GetUserSettings() : KomonFramework.Promise<Komon.Contract.Base.KomonResult<UserSettings,KnockoutObservable<UserSettings>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
		    
			return this._client.PostServer<UserSettings,KnockoutObservable<UserSettings>>("GetUserSettings",ps);
	
		}

		UpdateUserSettings(user:UserSettings) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<void,KnockoutObservable<void>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "user", Value: user });
		    
			return this._client.PostServer<void,KnockoutObservable<void>>("UpdateUserSettings",ps);
	
		}

		ChangePassword(oldPassword:string,newPassword:string) : KomonFramework.Promise<Komon.Contract.Base.KomonResult<void,KnockoutObservable<void>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
            ps.push({ Key: "oldPassword", Value: oldPassword });
            ps.push({ Key: "newPassword", Value: newPassword });
		    
			return this._client.PostServer<void,KnockoutObservable<void>>("ChangePassword",ps);
	
		}

		GetUserIdClientNames() : KomonFramework.Promise<Komon.Contract.Base.KomonResult<Dictionarystring, string,KnockoutObservable<Dictionarystring, string>>>
        { 
		    var ps = Array<KomonFramework.ServerArgument>();
		    
			return this._client.PostServer<Dictionarystring, string,KnockoutObservable<Dictionarystring, string>>("GetUserIdClientNames",ps);
	
		}
    }
}
