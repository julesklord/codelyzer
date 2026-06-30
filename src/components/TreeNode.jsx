import React from 'react';
import { Icon } from './Icon.jsx';

function countFiles(n){
    return n.files.length + Object.values(n.children).reduce(function(s,c){
        return s + countFiles(c);
    }, 0);
}

function areEqual(prevProps, nextProps) {
    return prevProps.node === nextProps.node &&
           prevProps.selected === nextProps.selected &&
           prevProps.activeFilter === nextProps.activeFilter &&
           prevProps.expanded.has(prevProps.node.path) === nextProps.expanded.has(nextProps.node.path);
}

export const TreeNode = React.memo(function TreeNodeInner(props){
    var node=props.node,selected=props.selected,onSelect=props.onSelect,expanded=props.expanded,toggle=props.toggle,filterFolder=props.filterFolder,activeFilter=props.activeFilter;
    var isOpen=expanded.has(node.path);
    var isFiltered=activeFilter===node.path;
    var children=React.useMemo(function(){return Object.values(node.children).sort(function(a,b){return a.name.localeCompare(b.name);});}, [node.children]);
    var fileCount=React.useMemo(function(){return countFiles(node);}, [node]);
    return React.createElement('div',null,
        React.createElement('div',{className:'tree-folder'+(isFiltered?' filtered':''),onClick:function(){if(node.path==='')filterFolder(null);else filterFolder(node.path);}},
            React.createElement('span',{className:'tree-toggle'+(isOpen?' open':''),onClick:function(e){e.stopPropagation();toggle(node.path);}},children.length>0||node.files.length>0?'▶':''),
            React.createElement(Icon,{name:isOpen?'folder-open':'folder',size:'m',className:'tree-entry-icon'}),
            React.createElement('span',{className:'tree-name'},node.name),
            React.createElement('span',{className:'tree-count'},fileCount)
        ),
        isOpen&&React.createElement('div',{className:'tree-children'},
            children.map(function(c){return React.createElement(TreeNode,{key:c.path,node:c,selected:selected,onSelect:onSelect,expanded:expanded,toggle:toggle,filterFolder:filterFolder,activeFilter:activeFilter});}),
            node.files.map(function(f){return React.createElement('div',{key:f.path,className:'tree-file'+(selected&&selected.path===f.path?' active':''),onClick:function(){onSelect(f.path);}},React.createElement(Icon,{name:'file',size:'s',className:'tree-entry-icon'}),React.createElement('span',{className:'tree-name'},f.name));})
        )
    );
}, areEqual);
