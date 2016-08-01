/**
 * Component - Folder Component
 *
 * @file Folder.js
 * @author mudio(job.mudio@gmail.com)
 */

import {remote} from 'electron';
import styles from './Folder.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import React, {Component, PropTypes} from 'react';
import * as ExplorerActons from '../../actions/explorer';

/* eslint no-underscore-dangle: [2, { "allowAfterThis": true }] */

class Folder extends Component {
    static propTypes = {
        item: PropTypes.shape({
            key: PropTypes.string.isRequired
        }),
        onDoubleClick: PropTypes.func.isRequired,
        onContextMenu: PropTypes.func.isRequired,
        view: PropTypes.func.isRequired,
        rename: PropTypes.func.isRequired,
        share: PropTypes.func.isRequired,
        download: PropTypes.func.isRequired,
        copy: PropTypes.func.isRequired,
        move: PropTypes.func.isRequired,
        trash: PropTypes.func.isRequired
    };

    _onDownload() {
        // 选择文件夹
        const {download, item} = this.props;
        const path = remote.dialog.showOpenDialog({properties: ['openDirectory']});
        // 用户取消了
        if (path === undefined) {
            return;
        }
        // 不支持选择多个文件夹，所以只取第一个
        download(item.key, path[0]);
    }

    _onContextMenu(evt) {
        evt.preventDefault();
        const {
            onContextMenu,
            // item, view, rename, copy, move, trash
        } = this.props;

        onContextMenu([
            // {name: '查看', icon: 'low-vision', click: () => view(item, FolderType)},
            // {name: '重命名', icon: 'pencil', click: () => rename(item, FolderType)},
            {name: '下载', icon: 'cloud-download', click: () => this._onDownload()}
            // {name: '复制', icon: 'copy', click: () => copy(item, FolderType)},
            // {name: '移动到', icon: 'arrows', click: () => move(item, FolderType)},
            // {name: '删除', icon: 'trash', click: () => trash(item, FolderType)}
        ], evt.clientX, evt.clientY);
    }

    render() {
        const {item, onDoubleClick} = this.props;

        return (
            <div
              className={styles.container}
              onContextMenu={evt => this._onContextMenu(evt)} // eslint-disable-line no-underscore-dangle
              onDoubleClick={() => onDoubleClick(item.key)}
            >
                <i className={`fa fa-4x fa-folder ${styles.folder}`}></i>
                <span className={styles.text} title={item.key.replace(/(.*\/)?(.*)\/$/, '$2')}>
                    {item.key.replace(/(.*\/)?(.*)\/$/, '$2')}
                </span>
            </div>
        );
    }
}

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ExplorerActons, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Folder);

