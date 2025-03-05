/* Generated File - Do not edit */
/* turn off unused variables that we know we are creating because it is generated code */
/* eslint no-unused-vars: off */
/* turn off lone blocks that we know we are creating because it is generated code due to content switchers */
/* eslint no-lone-blocks: off */
/* turn off === vs == because these are user created == from the MAML file */
/* eslint eqeqeq: off */
/* Turn off React Camel Case warnings, since generated files might not always have proper camel case */
/* eslint react/jsx-pascal-case: off */
/* Turn off React 17 lints in generated code */
/* eslint react/prop-types: off */
/* eslint complexity: off */
/* eslint no-shadow: off */
/* eslint no-duplicate-imports: off */
/* eslint function-paren-newline: off */
/* eslint jsx-quotes: off */
/* eslint dot-notation: off */
/* eslint no-nested-ternary: off */
/* eslint no-implicit-coercion: off */
/* eslint func-style: off */
/* eslint implicit-arrow-linebreak: off */
/* eslint react/jsx-key: off */
/* eslint react/no-children-prop: off */
/* eslint new-cap: off */
/* eslint radix: off */
/* eslint no-empty-function: off */
/* eslint array-bracket-newline: off */
/* eslint no-class-assign: off */
/* eslint init-declarations: off */
/* eslint no-console: off */
/* eslint import/first: off */
/* eslint no-func-assign: off */
/* eslint react-hooks/exhaustive-deps: off */


import { observer } from 'mobx-react';
import { inject } from 'mobx-react';
import { Loader } from '@maximo/react-components';
import { DataList } from '@maximo/react-components';
import React from 'react';
import DataListZxc2ccef32vitem from './DataListZxc2ccef32vitem';
class DataListZxc2ccef32v extends React.Component {
  

  

  render() {
    const props = this.props;
    const app = props.app;
const page = props.page || app.findPage('scheduleDetails') || app;
const dialog = props.dialog;
const datasource = app.findDatasource(props.datasource);
const item = props.item;
const index = props.index;
const itemId = props.itemId;
const eventManager = datasource;
const templateContext = props.templateContext;
    const skdprojActivityDS = props.skdprojActivityDS || app.findDatasource("skdprojActivityDS");
const skdactivityDS = props.skdactivityDS || app.findDatasource("skdactivityDS");
const skdprojectsDS = props.skdprojectsDS || app.findDatasource("skdprojectsDS");
const skdactivityunscheduledDS = props.skdactivityunscheduledDS || app.findDatasource("skdactivityunscheduledDS");
const resourceLoadTableds = props.resourceLoadTableds || app.findDatasource("resourceLoadTableds");
const resourceLevelingDs = props.resourceLevelingDs || app.findDatasource("resourceLevelingDs");
const resourceTypesDS = props.resourceTypesDS || app.findDatasource("resourceTypesDS");
const skdodmerunlatestDS = props.skdodmerunlatestDS || app.findDatasource("skdodmerunlatestDS");
const skdprojectshiftsDS = props.skdprojectshiftsDS || app.findDatasource("skdprojectshiftsDS");
const skdprojectscenarioDS = props.skdprojectscenarioDS || app.findDatasource("skdprojectscenarioDS");
const jglobalKPIds = props.jglobalKPIds || app.findDatasource("jglobalKPIds");
const jresourceLevelingTaskDS = props.jresourceLevelingTaskDS || app.findDatasource("jresourceLevelingTaskDS");

    

      if (!datasource) {
        app.log.t('DataListZxc2ccef32v', 'No datasource yet.  Will abort the render until we get a datasource');
        return '';
      }

      if (!eventManager.loader) eventManager.loader = Loader(eventManager)


      
    
        const renderItemFunc = (props) => {
          return <DataListZxc2ccef32vitem {...props} datasource={datasource} eventManager={datasource}/>
        };
      

    return (
      <DataList
        id={props.id + '_items'}
        
        dataListItemRenderer={renderItemFunc}
        rendererType='custom'
        itemClick={props.itemClick}
        datasource={datasource}
        border={props.border}
        height={props.height}
        margin={props.margin}
        showCount={props.showCount}
        recordCountLabel={props.recordCountLabel}
        expandAll={props.expandAll}
        selectedBackgroundColor={props.selectedBackgroundColor}
        width={props.width}
        dataListDragKey={props.dataListDragKey}
        dataListDropKey={props.dataListDropKey}
        showSearch={props.showSearch}
        autoComplete={props.autoComplete}
        autoCompleteDatasource={props.autoCompleteDatasource}
        autoCompleteDisplayField={props.autoCompleteDisplayField}
        autoCompleteValueField={props.autoCompleteValueField}
        customLink={props.customLink}
        onCustomLinkClick={props.onCustomLinkClick}
        dragAndDropItemClick={props.dragAndDropItemClick}
        customRender={props.customRender}
        searchPlaceholderText={props.searchPlaceholderText}
        loading-flag={datasource && datasource.state.loading}
        tight={props.tight}
        noSelectBehavior={props.noSelectBehavior}
        breadcrumbRootLabel={props.breadcrumbRootLabel} 
        hideSingleSelectIcon={props.hideSingleSelectIcon}
        backgroundColor={props.backgroundColor}
        
        childRenderers={{}}
        
        contentSelectionActions={null}
        attributeArray={props.attributes}
        labelArray={props.columnHeaders}
        titleFlexBasis={props.titleFlexBasis}
        multiAction={props.multiAction}
        title={props.title}
        selectAllLabel={props.selectAllLabel}
        showSingleSelectIcon={props.showSingleSelectIcon}
        startPaddingLevel={props.startPaddingLevel}
        padding={props.padding}
        selectedIcon={props.selectedIcon}
        unselectedIcon={props.unselectedIcon}
        emptySetString={props.emptySetString}
        subLabel={props.subLabel}
        itemToOpen={props.itemToOpen}
        warnStateField={props.warnStateField}
        itemsToOpen={props.itemsToOpen}
        emptyRowStyle={props.emptyRowStyle}
        onClickSelectAll={props.onClickSelectAll}
        onParentClick={props.onParentClick}
        
        enableBarcodeScanner={props.enableBarcodeScanner}
        timeout={props.timeout}
        readers={props.readers}
        
        
        
        recordtypeAttr={props.recordtypeAttr}
        contentActions={null}
        hierarchyDrillIn={props.hierarchyDrillIn}
        showLastChildSelection={props.showLastChildSelection}
        onDrillIn={props.onDrillIn}
        treeLabelAttributes = {()=>''}
        treeName={props.treeName}
        noDataButtonLabel={props.noDataButtonLabel}
        noDataButtonKind={props.noDataButtonKind}
        noDataButtonIcon={props.noDataButtonIcon}
        noDataAction={props.noDataAction}
        noDataIcon={props.noDataIcon}
        noDataSecondaryClickAction={props.noDataSecondaryClickAction}
        noDataSecondaryButtonLabel={props.noDataSecondaryButtonLabel}
        showOnhoverScroll={props.showOnhoverScroll}
        theme={props.theme}
        showDragHandle={props.showDragHandle}
        suppressNoDataPadding={props.suppressNoDataPadding}
        treeHeaderEnd={null}
        customTreeHeaderEnd={props.customTreeHeaderEnd}
        treeExtraFieldName={props.treeExtraFieldName}
        disableParentSelection={props.disableParentSelection}
        ancestor={props.ancestor}
        lastChildDrillIn={props.lastChildDrillIn}
        rowSpace={props.rowSpace}
        datacomponentoriginalid={props.datacomponentoriginalid}
        datacomponenttype={props.datacomponenttype}
        datadraggable={props.datadraggable}
        droppable={props.droppable}
      />
    
    );
  }
}
export default inject('app')(observer(DataListZxc2ccef32v));
    
